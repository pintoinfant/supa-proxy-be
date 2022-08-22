import { Router } from "express";
import Controller from "./proxy.controller";
import { rateLimiter, cache } from "../../helpers/cacheAndLimiter";

const proxy: Router = Router();
const controller = new Controller();

proxy.all("/*", rateLimiter, cache, controller.proxyData);

export default proxy;