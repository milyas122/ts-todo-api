import express from "express";
import { createTask, taskDetail } from "@/api/task.api";
const router = express.Router();

router.post("/", createTask); // create task
router.get("/:id", taskDetail);

export = router;
