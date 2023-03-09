import express from "express";
import { isAuth, isAdmin, isQuoteOwner } from "../middleware/auth.js";
import { listQuotes, createQuote, readQuote, updateQuote, removeQuote } from "../controllers/quote.controller.js";
import { calcLabour, calcRawLabour } from "../middleware/calcLabour.js";

const router = express.Router();

router.get("/", isAdmin, listQuotes);
router.post("/", isAuth, calcLabour, createQuote);
router.get("/:id", isAuth, isQuoteOwner, readQuote);
router.put("/:id", isAuth, isQuoteOwner, updateQuote);
router.delete("/:id", isAuth, isQuoteOwner, removeQuote);
router.post("/raw", isAdmin, calcRawLabour, createQuote);

export default router;
