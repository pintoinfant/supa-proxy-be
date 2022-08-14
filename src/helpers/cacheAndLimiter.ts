import { NextFunction, Request, Response } from "express";
import { supabase, redisClient } from "./client";
import { uniqueKey } from "./uniqueKey";

export const rateLimiter = async (req, res, next) => {
  let slug = req.originalUrl.split("/")[3];
  let slug_data = await supabase
    .from("config")
    .select("req_per_hour")
    .eq("slug", slug);
  let limit = slug_data.data[0].req_per_hour;
  const ip = req.ip;
  const request = await redisClient.get(ip);
  // const hits = await redisClient.incr(ip);
  if (parseInt(request) === 1) {
    await redisClient.expire(ip, 1 * 60 * 1000);
  }
  // redisClient.set(ip, 0);
  if (request > limit) {
    return res.json({
      success: false,
      message: "Too many request",
    });
  } else {
    await redisClient.incr(ip + req.orignalUrl);
    next();
  }
};

export const cache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let key = uniqueKey(req);
  const cachedData = await redisClient.get(key);
  if (cachedData) {
    return res.json({
      success: true,
      data: JSON.parse(cachedData),
    });
  } else {
    next();
  }
};

// export const async function rateLimiter(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   return async function ({ limit }) {
//     const ip = req.ip;
//     const request = await redisClient.get(ip);
//     console.log(request);
//     next();

//     // if (request === 1) {
//     //   await redisClient.expire(ip, 60 * 60 * 1000);
//     // }

//     // if (request > limit) {
//     //   return res.json({
//     //     success: false,
//     //     message: "Too many request",
//     //   });
//     // } else {
//     // }
//   };
// }
