import { Request, Response } from "express";
import { errorHandler } from "@/utils/errors";
import { validate } from "@/validations";
import { loginSchema, signupSchema } from "@/validations/auth.schema";
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
    return errorHandler(res, error, { logKey: "sendInvite" });
  }
}

async function resendInvite(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.body.email) {
      throw new BadRequest({ message: "email is required" });
    }

    const result = await authService.ResendInvitation(req.body.email);
    return res.status(200).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "resendInvite" });
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

async function signup(req: Request, res: Response): Promise<Response> {
  try {
    const { invite } = req.query;
    if (!invite) {
      throw new BadRequest({
        message: "invite token is required query params",
      });
    }
    const cleanedFields = await validate(signupSchema, req.body);
    const result = await authService.Signup({
      ...cleanedFields,
      inviteToken: invite,
    });
    return res.status(201).json({ ...result });
  } catch (error) {
    return errorHandler(res, error, { logKey: "UserSignup" });
  }
}

export default { sendInvite, resendInvite, login, signup };
