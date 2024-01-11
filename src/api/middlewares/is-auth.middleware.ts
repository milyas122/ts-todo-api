import { Request, Response, NextFunction } from "express";
import { UnAuthorized } from "@/utils/errors/custom-errors";
import { errorHandler } from "@/utils/errors";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { UserReqObject } from "./types";
import { appEnvVars } from "@/utils/env-vars";

declare global {
  namespace Express {
    interface Request {
      user?: UserReqObject;
    }
  }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers["authorization"];

    if (!authToken) {
      throw new UnAuthorized({
        message: "unauthorized - headers are missing",
      });
    }

    jwt.verify(
      authToken,
      appEnvVars.jwtSecret,
      function (err: VerifyErrors | null, decoded: UserReqObject | undefined) {
        if (err) {
          console.log(err);
          throw new UnAuthorized({
            message: "unauthorized - headers are missing",
          });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (err) {
    return errorHandler(res, err, { logKey: "auth middleware error" });
  }
}

export default authMiddleware;
