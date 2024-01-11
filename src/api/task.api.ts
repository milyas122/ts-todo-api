import { Request, Response } from "express";
import { errorHandler } from "@/utils/errors";
import { validate } from "@/validations";
import { taskSchema } from "@/validations/task.schema";
import { TaskService } from "@/services";

const taskService = new TaskService();

async function createTask(req: Request, res: Response): Promise<Response> {
  try {
    const cleanedFields = await validate(taskSchema, req.body);

    const { user, ...result } = await taskService.createTask({
      ...cleanedFields,
      userId: req.user.id,
    });

    return res.status(201).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "createTask" });
  }
}

async function taskDetail(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const { user, ...result } = await taskService.getTaskDetail(
      id,
      req.user.id
    );

    return res.status(201).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "taskDetail" });
  }
}

async function removeTask(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    await taskService.removeTask(id, req.user.id);

    return res.status(201).json({ message: "task deleted" });
  } catch (error) {
    return errorHandler(res, error, { logKey: "removeTask" });
  }
}

async function updateTask(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const cleanedFields = await validate(taskSchema, req.body);

    await taskService.updateTask({ id, userId: req.user.id, ...cleanedFields });

    return res.status(201).json({ message: "task updated successfully" });
  } catch (error) {
    return errorHandler(res, error, { logKey: "updateTask" });
  }
}

async function taskList(req: Request, res: Response): Promise<Response> {
  try {
    const { offset = 0, limit = 6, user = "", status = "" } = req.query;
    const { id, isAdmin } = req.user;

    const tasks = await taskService.getAllTasks({
      userId: id,
      isAdmin: Boolean(isAdmin),
      offset: Number(offset),
      limit: Number(limit),
      user: "" + user,
      status: "" + status,
    });

    return res.status(201).json({ ...tasks });
  } catch (error) {
    return errorHandler(res, error, { logKey: "task list" });
  }
}

export { createTask, taskDetail, removeTask, updateTask, taskList };
