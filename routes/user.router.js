import express from "express";
import { isAuth, isNotAuth, isAdmin } from "../middleware/auth.js";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", isNotAuth, controller.create);
router.get("/", isAuth, isAdmin, controller.list);
router.get("/:id", isAuth, isAdmin, controller.read);
router.put("/:id", isAuth, isAdmin, controller.update);
router.delete("/:id", isAuth, isAdmin, controller.remove);

export default router;
