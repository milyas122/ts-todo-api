import express from "express";
import userApi from "@/api/auth.api";

const router = express.Router();

router.get("/invite", userApi.sendInvite);
router.post("/login", userApi.login);

export = router;
