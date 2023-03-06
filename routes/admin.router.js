import express from "express";
import { setPayGrades, getRawQuote } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/pay", setPayGrades);
router.get("/quote/:id", getRawQuote);

export default router;
