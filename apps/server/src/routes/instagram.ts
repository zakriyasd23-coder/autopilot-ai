import express from "express";
import axios from "axios";
import Account from "../models/Account";

const router = express.Router();

router.get("/login", (req, res) => {
  const authUrl =
    `https://www.facebook.com/v19.0/dialog/oauth` +
    `?client_id=${process.env.INSTAGRAM_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI!)}` +
    `&scope=instagram_business_basic,instagram_business_manage_messages,instagram_manage_comments,pages_show_list` +
    `&response_type=code`;

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code as string;

    // exchange code for token
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

    // get facebook pages
    const pagesRes = await axios.get(
      "https://graph.facebook.com/me/accounts",
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    const pages = pagesRes.data.data;

    if (!pages.length) {
      return res.send("No Facebook page connected");
    }

    const pageId = pages[0].id;
    const pageToken = pages[0].access_token;

    // get instagram business account
    const igRes = await axios.get(
      `https://graph.facebook.com/${pageId}`,
      {
        params: {
          fields: "instagram_business_account",
          access_token: pageToken,
        },
      }
    );

    const igId = igRes.data.instagram_business_account?.id;

    if (!igId) {
      return res.send("No Instagram Business account linked");
    }

    // get instagram profile
    const profileRes = await axios.get(
      `https://graph.facebook.com/${igId}`,
      {
        params: {
          fields: "id,username,profile_picture_url",
          access_token: pageToken,
        },
      }
    );

    const user = profileRes.data;

    await Account.findOneAndUpdate(
      {
        platform: "Instagram",
        accountId: user.id,
      },
      {
        platform: "Instagram",
        accountId: user.id,
        accountName: user.username,
        avatar: user.profile_picture_url || "",
        accessToken: pageToken,
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