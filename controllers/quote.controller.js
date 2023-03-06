import Quote from "../models/quote.js";

const quoteSelectString = "_id tasks createTime";

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
		const { tasks } = req.body;

		// Create quote and extract data to plain object
		const quote = await Quote.create({ tasks });
		const quoteData = {
			_id: quote._id,
			tasks: quote.tasks,
			createTime: quote.createTime,
		};

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
			// TODO
			// Calculate labour costs with fudge factor
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
		const quote = await Quote.findOneAndUpdate({ _id: id }, { $set: data }).select(quoteSelectString).exec();
		if (quote) {
			// TODO
			// Calculate labour costs with fudge factor
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
