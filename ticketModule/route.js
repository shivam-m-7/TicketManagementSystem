import { Router } from "express";
import ticketController from "./controllers/ticket.controller.js";
import middleware from "../middleware/authenticate.middleware.js"
const router = Router();

router.post("/", middleware.authenticate, ticketController.create);
router.post("/:ticketId/assign", middleware.authenticate, ticketController.assign);
router.get("/:ticketId", middleware.authenticate, ticketController.detail)

export default router;