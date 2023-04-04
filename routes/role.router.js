import express from "express";
import { isAuth, isAdmin } from "../middleware/auth.js";
import { sanitiseRole } from "../middleware/sanitise.js";
import { validateRole, checkUniqueRoleName } from "../middleware/validate.js";
import { listRoles, createRole, readRole, updateRole, deleteRole } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", isAuth, listRoles);
router.post("/", isAdmin, sanitiseRole, validateRole, checkUniqueRoleName, createRole);
router.get("/:id", isAdmin, readRole);
router.put("/:id", isAdmin, sanitiseRole, validateRole, updateRole);
router.delete("/:id", isAdmin, deleteRole);

export default router;
