import Quote from "../models/quote.js";
import { calculateLabourCost, calculateRawLabourCost, extractQuoteData } from "../services/quote.service.js";
import { addQuoteToUser } from "../services/user.service.js";

const quoteSelectString = "_id name tasks timeCreated";

export const listQuotes = async (req, res) => {
	try {
		const quotes = await Quote.find().select(quoteSelectString).exec();
		res.status(200).json({ quotes });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createQuote = async (req, res) => {
	try {
		const { name, tasks } = req.body;
		// Calculate labour costs with fudge factor
		tasks.forEach(calculateLabourCost);
		
		// Create quote and extract data to plain object
		const quote = await Quote.create({ name, tasks });
		const quoteData = extractQuoteData(quote);

		// Add quote id to user quotes
		addQuoteToUser(req.user._id, quote._id);

		res.status(201).json({ quote: quoteData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createRawQuote = async (req, res) => {
	try {
		const { tasks } = req.body;
		// Calculate labour costs without fudge factor
		tasks.forEach(calculateRawLabourCost);

		// Create quote and extract data to plain object
		const quote = await Quote.create({ tasks });
		const quoteData = extractQuoteData(quote);

		// Add quote id to user quotes
		addQuoteToUser(req.user._id, quoteData._id);

		res.status(201).json({ quote: quoteData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const quote = await Quote.findById(id).select(quoteSelectString).exec();
		if (quote) {
			res.status(200).json({ quote });
		}
		else {
			res.status(404).json({ error: "Quote not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		// Calculate labour costs with fudge factor
		if (data.tasks) {
			data.tasks.forEach(calculateLabourCost);
		}

		const quote = await Quote.findOneAndUpdate({ _id: id }, { $set: data }).select(quoteSelectString).exec();
		if (quote) {
			res.status(200).json({ quote });
		}
		else {
			res.status(404).json({ error: "Quote not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const removeQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await Quote.deleteOne({ _id: id }).exec();
		if (result.deletedCount) {
			res.status(200).json({ success: true });
		}
		else {
			res.status(404).json({ error: "Quote not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
