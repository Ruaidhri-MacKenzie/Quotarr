import express from "express";
import { isAuth, isAdmin, isUserOwner } from "../middleware/auth.js";
import { validateCredentials, checkUniqueUsername } from "../middleware/validate.js";
import { listUsers, createUser, readUser, updateUser, removeUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", isAdmin, listUsers);
router.post("/", isAdmin, validateCredentials, checkUniqueUsername, createUser);
router.get("/:id", isAuth, isUserOwner, readUser);
router.put("/:id", isAuth, isUserOwner, updateUser);
router.delete("/:id", isAuth, isUserOwner, removeUser);

export default router;
