import express from "express";
import {
  createTask,
  taskDetail,
  removeTask,
  updateTask,
  taskList,
} from "@/api/task.api";
const router = express.Router();

router.post("/", createTask); // create task
router.get("/", taskList);
router.get("/:id", taskDetail);
router.delete("/:id", removeTask);
router.patch("/:id", updateTask);

export = router;
