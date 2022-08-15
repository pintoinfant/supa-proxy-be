import { Router } from "express";

import stats from "./stats/stats.route"
import proxy from "./proxy/proxy.route";

const router: Router = Router();

router.use("/stats" , stats);
router.use("/proxy", proxy);

// router.use("/users", users);
// router.use("/projects", projects);

export default router;
