import { Router, Request } from "express";
import Controller from "./proxy.controller";

const proxy: Router = Router();
const controller = new Controller();

// Retrieve all Users
proxy.get("/:slug", controller.proxyData);
proxy.all("/:slug/*", controller.proxyData);

export default proxy;
