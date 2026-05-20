import express from "express";
import axios from "axios";
import Account from "../models/Account";

const router = express.Router();

router.get("/login", (req, res) => {
  const authUrl =
    `https://www.facebook.com/v19.0/dialog/oauth` +
    `?client_id=${process.env.INSTAGRAM_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI!)}` +
    `&scope=instagram_business_basic` +
    `&response_type=code`;

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code as string;

    const tokenRes = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          client_id: process.env.INSTAGRAM_CLIENT_ID,
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
          code,
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,picture",
          access_token: accessToken,
        },
      }
    );

    const user = userRes.data;

    await Account.findOneAndUpdate(
      {
        platform: "Instagram",
        accountId: user.id,
      },
      {
        platform: "Instagram",
        accountId: user.id,
        accountName: user.name,
        avatar: user.picture?.data?.url || "",
        accessToken,
        connected: true,
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.redirect("http://localhost:5179/dashboard");

  } catch (error: any) {
    console.error(
      "INSTAGRAM ERROR:",
      error.response?.data || error.message
    );

    res.send("Instagram login failed");
  }
});

export default router;