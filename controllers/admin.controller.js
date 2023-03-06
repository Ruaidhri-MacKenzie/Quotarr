import Quote from "../models/quote.js";

export const setPayGrades = (req, res) => {
	// TODO
	res.status(200).json({ success: true });
};

export const getRawQuote = async (req, res) => {
	try {
		const id = req.params.id;
		const quote = await Quote.findById(id).select("_id tasks createTime").populate("tasks").exec();
		if (quote) {
			// TODO
			// Calculate labour costs without fudge factor
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
