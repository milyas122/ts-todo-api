import express from "express";
import { createTask, taskDetail, removeTask } from "@/api/task.api";
const router = express.Router();

router.post("/", createTask); // create task
router.get("/:id", taskDetail);
router.delete("/:id", removeTask);

export = router;
