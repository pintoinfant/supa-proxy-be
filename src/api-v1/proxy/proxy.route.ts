import { Router } from "express";
import Controller from "./proxy.controller";
import { rateLimiter, cache } from "../../helpers/cacheAndLimiter";

const proxy: Router = Router();
const controller = new Controller();

// proxy.use(rateLimiter);

// Retrieve all Users
proxy.get("/:slug", controller.proxyData);
proxy.all("/:slug/*", rateLimiter, cache, controller.proxyData);

export default proxy;
