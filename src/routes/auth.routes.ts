import express from "express";
import userApi from "@/api/auth.api";
import { authMiddleware, isAdmin } from "@/api/middlewares";

const router = express.Router();

router.get("/invite", authMiddleware, isAdmin, userApi.sendInvite);
router.post("/login", userApi.login);

export = router;
