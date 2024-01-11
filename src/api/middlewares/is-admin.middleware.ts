import { Request, Response, NextFunction } from "express";
import { UnAuthorized } from "@/utils/errors/custom-errors";
import { errorHandler } from "@/utils/errors";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      throw new UnAuthorized({
        message: "not authorized to perform action",
      });
    }
    next();
  } catch (err) {
    return errorHandler(res, err, { logKey: "admin middleware error" });
  }
}

export default isAdmin;
