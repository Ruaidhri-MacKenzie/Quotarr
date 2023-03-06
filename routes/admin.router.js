import express from "express";
import { setPayGrades, createRawQuote } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/pay", setPayGrades);
router.post("/quote", createRawQuote);

export default router;
