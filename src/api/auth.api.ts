import { Request, Response } from "express";
import { errorHandler } from "@/utils/errors";
import { validate } from "@/validations";
import { loginSchema } from "@/validations/auth.schema";
import { AuthService } from "@/services";
import { BadRequest } from "@/utils/errors/custom-errors";

const authService = new AuthService();

async function sendInvite(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.body.email) {
      throw new BadRequest({ message: "email is required" });
    }

    const result = await authService.InviteUser(req.body.email);
    return res.status(201).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "UserSignup" });
  }
}

async function login(req: Request, res: Response): Promise<Response> {
  try {
    const cleanedFields = await validate(loginSchema, req.body);
    const result = await authService.SignIn({ ...cleanedFields });

    return res.status(200).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "UserLogin" });
  }
}

export default { sendInvite, login };
