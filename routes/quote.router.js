import express from "express";
import { isAuth } from "../middleware/auth.js";
import * as controller from "../controllers/quote.controller.js";

const router = express.Router();

router.post("/", isAuth, controller.create);
router.get("/", isAuth, controller.list);
router.get("/:id", isAuth, controller.read);
router.put("/:id", isAuth, controller.update);
router.delete("/:id", isAuth, controller.remove);

export default router;
