import { Request, Response, NextFunction } from "express";

function asyncHandler(cb: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await cb(req, res, next);
    } catch (err: Error | any) {
      next(err);
    }
  };
}

export default asyncHandler;
