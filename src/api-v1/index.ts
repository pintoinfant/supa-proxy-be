import { Router } from "express";

import users from "./users/users.route";
import proxy from "./proxy/proxy.route";

const router: Router = Router();

router.use("/proxy", proxy);

// router.use("/users", users);
// router.use("/projects", projects);

export default router;
