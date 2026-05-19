import { Router } from "express";
import Account from "../models/Account";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().sort({
      createdAt: -1,
    });

    res.json(accounts);
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