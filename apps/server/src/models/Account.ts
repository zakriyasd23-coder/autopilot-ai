import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    platform: {
      type: String,
      required: true,
    },

    accountId: {
      type: String,
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    accessToken: {
      type: String,
    },

    refreshToken: {
      type: String,
    },

    connected: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Account", accountSchema);