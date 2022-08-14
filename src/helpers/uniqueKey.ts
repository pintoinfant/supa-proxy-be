import { Request } from "express";

export function uniqueKey(req: Request) {
  let key = req.originalUrl;
  if (Object.keys(req.query).length > 0) {
    key = key + "_" + Object.values(req.query).join("_");
  }
  if (Object.keys(req.body).length > 0) {
    key = key + "_" + Object.values(req.body).join("_");
  }
  return key;
}
