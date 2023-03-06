import express from "express";
import { validateCredentials, checkUniqueUsername } from "../middleware/validate.js";
import { signUp, signIn, signOut, refreshAccessToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validateCredentials, checkUniqueUsername, signUp);
router.post("/signin", validateCredentials, signIn);
router.get("/signout", signOut);
router.get("/", refreshAccessToken);

export default router;
