import express from "express";
import { isAuth, isNotAuth } from "../middleware/auth.js";
import { validateCredentials, checkUniqueUsername } from "../middleware/validate.js";
import { signUp, signIn, signOut, cookieSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", isNotAuth, validateCredentials, checkUniqueUsername, signUp);
router.post("/signin", isNotAuth, validateCredentials, signIn);
router.get("/signout", isAuth, signOut);
router.get("/", isAuth, cookieSignIn);

export default router;
