import express from "express";
import { isAuth, isAdmin } from "../middleware/auth.js";
import { listPaygrades, createPaygrade, readPaygrade, updatePaygrade, removePaygrade, listPaygradeNames } from "../controllers/paygrade.controller.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, listPaygrades);
router.post("/", isAuth, isAdmin, createPaygrade);
router.get("/:id", isAuth, isAdmin, readPaygrade);
router.put("/:id", isAuth, isAdmin, updatePaygrade);
router.delete("/:id", isAuth, isAdmin, removePaygrade);
router.get("/names", isAuth, listPaygradeNames);

export default router;
