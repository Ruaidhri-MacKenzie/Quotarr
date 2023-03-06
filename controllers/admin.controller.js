import Quote from "../models/quote.js";
import { calculateRawLabourCost, extractQuoteData } from "../services/quote.service.js";

export const setPayGrades = (req, res) => {
	// TODO
	res.status(200).json({ success: true });
};

export const createRawQuote = async (req, res) => {
	try {
		const { tasks } = req.body;
		// Calculate labour costs without fudge factor
		tasks.forEach(calculateRawLabourCost);

		// Create quote and extract data to plain object
		const quote = await Quote.create({ tasks });
		const quoteData = extractQuoteData(quote);

		res.status(201).json({ quote: quoteData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
