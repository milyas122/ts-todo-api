import express from "express";
import authRoutes from "./auth.routes";

const router = express.Router();

router.use("/", authRoutes);

export = router;
