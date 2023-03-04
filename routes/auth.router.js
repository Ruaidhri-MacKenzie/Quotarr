import express from "express";
import { isAuth, isNotAuth } from "../middleware/auth.js";
import * as controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", isNotAuth, controller.signIn);
router.get("/", isAuth, controller.signOut);

export default router;
