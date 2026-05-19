import { Router } from "express";
import axios from "axios";
import Account from "../models/Account";

const router = Router();

router.get("/login", (req, res) => {
  const url =
    `https://www.facebook.com/v19.0/dialog/oauth` +
    `?client_id=${process.env.META_APP_ID}` +
    `&redirect_uri=${process.env.META_REDIRECT_URI}` +
    `&scope=public_profile`;

  res.redirect(url);
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const tokenRes = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          client_id: process.env.META_APP_ID,
          client_secret: process.env.META_APP_SECRET,
          redirect_uri: process.env.META_REDIRECT_URI,
          code,
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,picture,email",
          access_token: accessToken,
        },
      }
    );

    const user = userRes.data;

    await Account.create({
  platform: "Facebook",
  accountId: user.id,
  accountName: user.name,
  avatar: user.picture?.data?.url,
  accessToken,
});

    res.redirect("http://localhost:5179/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Facebook login failed");
  }
});

export default router;