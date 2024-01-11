import express from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

import { authMiddleware } from "@/api/middlewares";

const router = express.Router();

router.use("/", authRoutes);
router.use("/tasks", authMiddleware, taskRoutes);

export = router;
