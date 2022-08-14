import { Router } from "express";
import Controller from "./proxy.controller";

const proxy: Router = Router();
const controller = new Controller();

// Retrieve all Users
proxy.get("/", controller.getHomePage);
proxy.get("/:slug", controller.proxyData);
proxy.all("/:slug/*", controller.proxyData);

export default proxy;
