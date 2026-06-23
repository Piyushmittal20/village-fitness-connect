import { Router, type IRouter } from "express";
import healthRouter from "./health";
import trainersRouter from "./trainers";
import routinesRouter from "./routines";
import dietPlansRouter from "./diet_plans";
import progressRouter from "./progress";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/trainers", trainersRouter);
router.use("/routines", routinesRouter);
router.use("/diet-plans", dietPlansRouter);
router.use("/progress", progressRouter);
router.use("/dashboard", dashboardRouter);

export default router;
