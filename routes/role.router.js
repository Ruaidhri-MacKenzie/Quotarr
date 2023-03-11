import express from "express";
import { isAuth, isAdmin } from "../middleware/auth.js";
import { checkUniqueRoleName } from "../middleware/validate.js";
import { listRoles, createRole, readRole, updateRole, removeRole, listRoleNames } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", isAuth, listRoles);
router.post("/", isAdmin, checkUniqueRoleName, createRole);
router.get("/:id", isAdmin, readRole);
router.put("/:id", isAdmin, updateRole);
router.delete("/:id", isAdmin, removeRole);

export default router;
