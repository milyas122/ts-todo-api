import express from "express";
import { createTask } from "@/api/task.api";
const router = express.Router();

router.post("/", createTask); // create task

export = router;
