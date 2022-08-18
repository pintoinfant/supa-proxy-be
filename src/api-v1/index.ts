import { Router } from "express";

import stats from "./stats/stats.route"

const router: Router = Router();

router.use("/stats" , stats);

// router.use("/users", users);
// router.use("/projects", projects);

export default router;
