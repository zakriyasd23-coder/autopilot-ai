import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    stats: {
      subscribers: {
        type: Number,
        default: 0,
      },

      followers: {
        type: Number,
        default: 0,
      },

      views: {
        type: Number,
        default: 0,
      },

      videos: {
        type: Number,
        default: 0,
      },

      posts: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Account", accountSchema);