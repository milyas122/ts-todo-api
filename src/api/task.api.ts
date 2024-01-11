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
    return errorHandler(res, error, { logKey: "sendInvite" });
  }
}

export { createTask };
