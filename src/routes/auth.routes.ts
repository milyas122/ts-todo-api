import express from "express";
import userApi from "@/api/auth.api";
import { authMiddleware, isAdmin } from "@/api/middlewares";

const router = express.Router();

router.post("/invite", authMiddleware, isAdmin, userApi.sendInvite);
router.post("/resend-invite", authMiddleware, isAdmin, userApi.resendInvite);
router.post("/login", userApi.login);

export = router;
