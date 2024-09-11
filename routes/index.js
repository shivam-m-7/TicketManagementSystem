import { Router } from "express";
import authRoutes from "../authModule/routes.js"
import ticketRoutes from "../ticketModule/route.js"

const router = Router();

router.use("/api/auth", authRoutes)
router.use("/api/tickets", ticketRoutes)


export default router;