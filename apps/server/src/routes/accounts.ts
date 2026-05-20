import { Router } from "express";
import Account from "../models/Account";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().sort({
      createdAt: -1,
    });

    const updatedAccounts = await Promise.all(
      accounts.map(async (account: any) => {
        try {
          if (
            account.platform === "YouTube" &&
            account.accessToken
          ) {
            const channelRes = await axios.get(
              "https://www.googleapis.com/youtube/v3/channels",
              {
                params: {
                  part: "snippet,statistics",
                  mine: true,
                },
                headers: {
                  Authorization: `Bearer ${account.accessToken}`,
                },
              }
            );

            const channel = channelRes.data.items?.[0];

            if (channel) {
              account.avatar =
                channel.snippet.thumbnails.default.url;

              account.stats = {
                subscribers: Number(
                  channel.statistics.subscriberCount || 0
                ),
                views: Number(
                  channel.statistics.viewCount || 0
                ),
                videos: Number(
                  channel.statistics.videoCount || 0
                ),
                followers: 0,
                posts: 0,
              };

              await account.save();
            }
          }

          return account;
        } catch (err) {
          console.log(
            "YT stats fetch failed:",
            account.accountName
          );
          return account;
        }
      })
    );

    res.json(updatedAccounts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);

    res.json({
      message: "Account disconnected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;