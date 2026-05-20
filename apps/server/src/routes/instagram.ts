import express from "express";
import axios from "axios";
import Account from "../models/Account";

const router = express.Router();

router.get("/login", (req, res) => {
  const authUrl =
    `https://www.instagram.com/oauth/authorize` +
    `?client_id=${process.env.INSTAGRAM_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI!)}` +
    `&response_type=code` +
    `&scope=user_profile,user_media`;

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code as string;

    const tokenRes = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID!,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;
    const userId = tokenRes.data.user_id;

    const userRes = await axios.get(
      `https://graph.instagram.com/${userId}`,
      {
        params: {
          fields: "id,username",
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
        accountName: user.username,
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
    console.error("INSTAGRAM ERROR:", error.response?.data || error.message);
    res.send("Instagram login failed");
  }
});

export default router;