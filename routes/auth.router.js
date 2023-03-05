import express from "express";
import { isAuth, isNotAuth, validateCredentials, checkUniqueUsername } from "../middleware/auth.js";
import { signUp, signIn, signOut, refreshAccessToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", isNotAuth, validateCredentials, checkUniqueUsername, signUp);
router.post("/signin", isNotAuth, validateCredentials, signIn);
router.get("/signout", isAuth, signOut);
router.get("/", isNotAuth, refreshAccessToken);

export default router;
