import express from "express";
import {
  checkIsAuth,
  googleLogin,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { VerifyToken } from "../middleware/VerifyToken.middleware.js";
import passport from "passport";

const router = express.Router();

router.get("/is-auth", VerifyToken, checkIsAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", VerifyToken, logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleLogin
);

export default router;
