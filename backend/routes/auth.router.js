import express from "express";
import {
  checkIsAuth,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { VerifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/is-auth", VerifyToken, checkIsAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", VerifyToken, logout);
router.put('/update',VerifyToken,updateProfile);

export default router;
