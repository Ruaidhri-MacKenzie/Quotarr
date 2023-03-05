import express from "express";
import { isAuth, isNotAuth, validateCredentials, checkUniqueUsername } from "../middleware/auth.js";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", isNotAuth, validateCredentials, checkUniqueUsername, signUp);
router.post("/signin", isNotAuth, validateCredentials, signIn);
router.get("/", isAuth, signOut);

export default router;
