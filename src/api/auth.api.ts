import { Request, Response } from "express";
import { errorHandler } from "@/utils/errors";
import { validate } from "@/validations";
import { loginSchema } from "@/validations/auth.schema";
import { AuthService } from "@/services";

const authService = new AuthService();

async function sendInvite(req: Request, res: Response): Promise<Response> {
  try {
    return res.status(201).json({ message: "invite sent successfully" });
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
