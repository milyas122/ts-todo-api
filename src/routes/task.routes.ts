import express from "express";
import { createTask, taskDetail, removeTask, updateTask } from "@/api/task.api";
const router = express.Router();

router.post("/", createTask); // create task
router.get("/:id", taskDetail);
router.delete("/:id", removeTask);
router.patch("/:id", updateTask);

export = router;
