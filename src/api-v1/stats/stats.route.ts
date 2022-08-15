import { Router } from "express";
import Controller from "./stats.controller";

const stats: Router = Router();
const controller = new Controller();

// Retrieve all stats
stats.get("/:slug/method", controller.getMethodStats);
stats.get("/:slug/path", controller.getPath);

export default stats;
