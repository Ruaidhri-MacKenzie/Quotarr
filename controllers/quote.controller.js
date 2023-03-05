import Quote from "../models/quote.js";

export const listQuotes = async (req, res) => {
	try {
		const quotes = await Quote.find().exec();
		res.status(200).json(quotes);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createQuote = async (req, res) => {
	try {
		const data = req.body;
		const quote = await Quote.create(data);
		res.status(201).json(quote);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const readQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const quote = await Quote.findById(id).exec();
		res.status(200).json(quote);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const quote = await Quote.findOneAndUpdate({ _id: id}, {$set: data}).exec();
		res.status(200).json(quote);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const removeQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const success = await Quote.deleteOne({ _id: id }).exec();
		res.status(200).json(success);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};
