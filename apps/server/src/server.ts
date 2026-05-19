import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import accountsRouter from "./routes/accounts";
import authRouter from "./routes/auth";
import oauthRouter from "./routes/oauth";
import metaRoutes from "./routes/meta";
import instagramRoutes from "./routes/instagram";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5179",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/instagram", instagramRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/accounts", accountsRouter);
app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.get("/", (req, res) => {
  res.send("AutoPilot AI Backend Running");
});
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});