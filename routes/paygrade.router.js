import express from "express";
import { isAuth, isAdmin } from "../middleware/auth.js";
import { listPaygrades, createPaygrade, readPaygrade, updatePaygrade, removePaygrade, listPaygradeNames } from "../controllers/paygrade.controller.js";

const router = express.Router();

router.get("/", isAdmin, listPaygrades);
router.post("/", isAdmin, createPaygrade);
router.get("/:id", isAdmin, readPaygrade);
router.put("/:id", isAdmin, updatePaygrade);
router.delete("/:id", isAdmin, removePaygrade);
router.get("/names", isAuth, listPaygradeNames);

export default router;
