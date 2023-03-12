import * as quoteService from "../services/quote.service.js";

export const listQuotes = async (req, res) => {
	try {
		const quotes = await quoteService.listQuotes();
		res.status(200).json({ quotes });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createQuote = async (req, res) => {
	try {
		const quote = await quoteService.createQuote(req.user._id, req.body);
		res.status(201).json({ quote });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readQuote = async (req, res) => {
	try {
		const quote = await quoteService.readQuote(req.params.id);
		if (quote) res.status(200).json({ quote });
		else res.status(404).json({ error: "Quote not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateQuote = async (req, res) => {
	try {
		const quote = await quoteService.updateQuote(req.params.id, req.body);
		if (quote) res.status(200).json({ quote });
		else res.status(404).json({ error: "Quote not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const deleteQuote = async (req, res) => {
	try {
		const success = quoteService.deleteQuote(req.params.id);
		if (success) res.status(200).json({ success });
		else res.status(404).json({ error: "Quote not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
