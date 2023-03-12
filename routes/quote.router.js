import express from "express";
import { isAuth, isAdmin, isQuoteOwner } from "../middleware/auth.js";
import { validateQuote, validateCombineQuotes } from "../middleware/validate.js";
import { calcLabour, calcRawLabour, combineQuotes } from "../middleware/transform.js";
import { listQuotes, createQuote, readQuote, updateQuote, deleteQuote } from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", isAdmin, listQuotes);
router.post("/", isAuth, validateQuote, calcLabour, createQuote);
router.post("/combine", isAuth, validateCombineQuotes, combineQuotes, calcLabour, createQuote);

router.post("/raw", isAdmin, validateQuote, calcRawLabour, createQuote);
router.post("/raw/combine", isAdmin, validateCombineQuotes, combineQuotes, calcRawLabour, createQuote);
router.put("/raw/:id", isAdmin, validateQuote, calcRawLabour, updateQuote);

router.get("/:id", isAuth, isQuoteOwner, readQuote);
router.put("/:id", isAuth, isQuoteOwner, validateQuote, calcLabour, updateQuote);
router.delete("/:id", isAuth, isQuoteOwner, deleteQuote);

export default router;
