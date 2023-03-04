import express from "express";
import { isAuth } from "../middleware/auth.js";
import * as controller from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", isAuth, controller.list);
router.post("/", isAuth, controller.create);
router.get("/:id", isAuth, controller.read);
router.put("/:id", isAuth, controller.update);
router.delete("/:id", isAuth, controller.remove);

export default router;
