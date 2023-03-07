import express from "express";
import { isAuth, isAdmin, isQuoteOwner } from "../middleware/auth.js";
import { listQuotes, createQuote, readQuote, updateQuote, removeQuote, createRawQuote } from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", isAdmin, listQuotes);
router.post("/", isAuth, createQuote);
router.get("/:id", isAuth, isQuoteOwner, readQuote);
router.put("/:id", isAuth, isQuoteOwner, updateQuote);
router.delete("/:id", isAuth, isQuoteOwner, removeQuote);
router.post("/raw", isAdmin, createRawQuote);

export default router;
