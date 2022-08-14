import { createClient } from "@supabase/supabase-js";
import * as Redis from "redis";

import * as dotenv from "dotenv";
dotenv.config();

let SUPABASE_URL = String(process.env.SUPABASE_URL);
let SUPABASE_ANON_KEY = String(process.env.SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
