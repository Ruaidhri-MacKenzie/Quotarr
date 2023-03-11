import express from "express";
import { isAuth, isAdmin, isQuoteOwner } from "../middleware/auth.js";
import { validateQuote } from "../middleware/validate.js";
import { calcLabour, calcRawLabour } from "../middleware/calcLabour.js";
import { listQuotes, createQuote, readQuote, updateQuote, removeQuote } from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", isAdmin, listQuotes);
router.post("/", isAuth, validateQuote, calcLabour, createQuote);
router.post("/raw", isAdmin, validateQuote, calcRawLabour, createQuote);
router.get("/:id", isAuth, isQuoteOwner, readQuote);
router.put("/:id", isAuth, isQuoteOwner, updateQuote);
router.delete("/:id", isAuth, isQuoteOwner, removeQuote);

export default router;
