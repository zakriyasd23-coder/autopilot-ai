import { Router } from "express";
import axios from "axios";
import Account from "../models/Account";

const router = Router();

router.get("/login", (req, res) => {
  const url =
    `https://www.facebook.com/v19.0/dialog/oauth` +
    `?client_id=${process.env.META_APP_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.META_REDIRECT_URI!)}` +
    `&scope=public_profile,pages_show_list,pages_read_engagement,instagram_basic,business_management`;

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

    // Facebook user
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
        platform: "Facebook",
        accountId: user.id,
      },
      {
        platform: "Facebook",
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

    // Facebook pages
    const pagesRes = await axios.get(
      "https://graph.facebook.com/me/accounts",
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    const pages = pagesRes.data.data || [];

    for (const page of pages) {
      try {
        const igRes = await axios.get(
          `https://graph.facebook.com/${page.id}`,
          {
            params: {
              fields: "instagram_business_account",
              access_token: accessToken,
            },
          }
        );

        const igAccount = igRes.data.instagram_business_account;

        if (igAccount?.id) {
          const igProfile = await axios.get(
            `https://graph.facebook.com/${igAccount.id}`,
            {
              params: {
                fields: "id,username,profile_picture_url",
                access_token: accessToken,
              },
            }
          );

          await Account.findOneAndUpdate(
            {
              platform: "Instagram",
              accountId: igProfile.data.id,
            },
            {
              platform: "Instagram",
              accountId: igProfile.data.id,
              accountName: igProfile.data.username,
              avatar: igProfile.data.profile_picture_url || "",
              accessToken,
              connected: true,
            },
            {
              upsert: true,
              new: true,
            }
          );
        }
      } catch (err) {
        console.log("No Instagram linked to page");
      }
    }

    res.redirect("http://localhost:5179/dashboard");

  } catch (error: any) {
    console.error("META ERROR:", error.response?.data || error.message);
    res.send("Meta login failed");
  }
});

export default router;