import express from "express";
import {
  createTask,
  taskDetail,
  removeTask,
  updateTask,
  taskList,
} from "@/api/task.api";
const router = express.Router();

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               title: "ilyas task 2"
 *               status: "pending"
 *               id: "4dbbcd90-03a4-4d65-b064-cb3c12c8cf34"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 - "title is a required field"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "unauthorized - headers are missing"
 */
router.post("/", createTask);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get a list of tasks
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Number of items to skip in the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of items to return in the result set
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter tasks by user ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["pending", "completed"]
 *         description: Filter tasks by status
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             example:
 *               tasks:
 *                 - id: "0f71f0c7-ede1-4011-aff7-ede55ce9f9d4"
 *                   title: "kashif task1"
 *                   status: "pending"
 *                   user: "25a2c16b-4509-4816-afa2-350024e16872"
 *                 - id: "0feafce4-bf47-4353-896f-6086491707cc"
 *                   title: "kashif task8"
 *                   status: "pending"
 *                   user: "25a2c16b-4509-4816-afa2-350024e16872"
 *               total: 16
 *               totalPages: 3
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "unauthorized - headers are missing"
 */
router.get("/", taskList);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get details of a specific task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             example:
 *               id: "d6be9341-cc02-44ed-97a1-c255bc54d380"
 *               title: "updated 2"
 *               status: "completed"
 *       400:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "task not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "unauthorized - headers are missing"
 */
router.get("/:id", taskDetail);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a specific task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: task deleted
 *       400:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "task not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "unauthorized - headers are missing"
 */
router.delete("/:id", removeTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update a specific task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the task
 *               status:
 *                 type: string
 *                 enum: ["pending", "completed"]
 *                 description: New status for the task
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "task updated successfully"
 *       400:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "task not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: "unauthorized - headers are missing"
 */
router.patch("/:id", updateTask);

export = router;
