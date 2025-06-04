import express from "express";
import {
  checkUser,
  getMe,
  login,
  register,
} from "@/modules/shared/auth/auth.controller";
import { verifyToken } from "@/modules/shared/auth/auth.middleware";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/check-username", checkUser);

router.get("/me", verifyToken, getMe);

router.get("/test", (req, res) => {
  res.json({ user: "test link not verify" });
});

export default router;
