import express from "express";
import { isAuth, isAdmin } from "../middleware/auth.js";
import { listRoles, createRole, readRole, updateRole, removeRole, listRoleNames } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", isAdmin, listRoles);
router.post("/", isAdmin, createRole);
router.get("/:id", isAdmin, readRole);
router.put("/:id", isAdmin, updateRole);
router.delete("/:id", isAdmin, removeRole);
router.get("/names", isAuth, listRoleNames);

export default router;
