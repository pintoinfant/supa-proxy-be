import { NextFunction, Request, Response } from "express";
import { supabase } from "./client";

export const supabaseLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let slug = req.originalUrl.split("/")[3];
  let params = req.originalUrl.replace(`/v1/proxy/${slug}`, "");
  await supabase.from("logs").insert([
    {
      slug,
      method: req.method,
      path: params ? params : "/",
      ip: req.ip,
    },
  ]);
  next();
};
