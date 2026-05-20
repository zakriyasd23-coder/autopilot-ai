import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import { google } from "googleapis";
import Account from "../models/Account";

const router = Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT
);

router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: true,
    scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
  });

  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  try {
    const code = req.query.code as string;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const response = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    });

    const channel = response.data.items?.[0];

    if (!channel) {
      return res.send("No YouTube channel found");
    }

    await Account.findOneAndUpdate(
  {
    platform: "YouTube",
    accountId: channel.id,
  },
  {
    platform: "YouTube",
    accountId: channel.id,
    accountName: channel.snippet?.title,
    avatar:
      channel.snippet?.thumbnails?.default?.url || "",
    accessToken: tokens.access_token || "",
    refreshToken: tokens.refresh_token || "",
    connected: true,
  },
  {
    upsert: true,
    new: true,
  }
);
    res.redirect("http://localhost:5176/dashboard");
  } catch (error: any) {
  console.error("FULL OAUTH ERROR:", error);
  res.status(500).send(error.message || "OAuth failed");
}

});

export default router;