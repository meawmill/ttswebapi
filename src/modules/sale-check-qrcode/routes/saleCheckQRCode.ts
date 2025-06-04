import express from "express";
import { getMe } from "@/modules/shared/auth/auth.controller";
import { verifyToken } from "@/modules/shared/auth/auth.middleware";

const router = express.Router();

router.get("/me", verifyToken, getMe);

router.get("/test", (req, res) => {
  res.json({ user: "test link not verify" });
});

export default router;
