import { Router } from "express";
import authController from "./controller/auth.controller.js";
import authValidator from "./validators/auth.validator.js";
import {validate} from '../middleware/validation.middleware.js';

const router = Router();

router.post("/register", validate(authValidator.register), authController.register);
router.post("/login", validate(authValidator.login), authController.login);

export default router;