import express from "express";
import { isAuth, isAdmin, isQuoteOwner } from "../middleware/auth.js";
import { sanitiseQuote, sanitiseCombineQuotes } from "../middleware/sanitise.js";
import { validateQuote, validateCombineQuotes } from "../middleware/validate.js";
import { calcLabour, calcRawLabour, combineQuotes } from "../middleware/transform.js";
import { listQuotes, createQuote, readQuote, updateQuote, deleteQuote } from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", isAdmin, listQuotes);
router.post("/", isAuth, sanitiseQuote, validateQuote, calcLabour, createQuote);
router.post("/combine", isAuth, sanitiseCombineQuotes, validateCombineQuotes, combineQuotes, calcLabour, createQuote);

router.post("/raw", isAdmin, sanitiseQuote, validateQuote, calcRawLabour, createQuote);
router.post("/raw/combine", isAdmin, sanitiseCombineQuotes, validateCombineQuotes, combineQuotes, calcRawLabour, createQuote);
router.put("/raw/:id", isAdmin, sanitiseQuote, validateQuote, calcRawLabour, updateQuote);

router.get("/:id", isAuth, isQuoteOwner, readQuote);
router.put("/:id", isAuth, isQuoteOwner, sanitiseQuote, validateQuote, calcLabour, updateQuote);
router.delete("/:id", isAuth, isQuoteOwner, deleteQuote);

export default router;
