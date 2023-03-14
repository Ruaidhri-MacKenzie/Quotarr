import * as quoteService from "../services/quote.service.js";

export const calcLabour = async (req, res, next) => {
	// Calculate labour costs with fudge factor
	const taskCount = req.body.tasks?.length || 0;
	for (let i = 0; i < taskCount; i++) {
		if (!req.body.tasks[i].labourCost && req.body.tasks[i].labour.length > 0) {
			const labourCost = await quoteService.calculateLabourCost(req.body.tasks[i]);
			req.body.tasks[i].labourCost = labourCost;
		}
	}
	next();
};

export const calcRawLabour = async (req, res, next) => {
	// Calculate labour costs without fudge factor
	const taskCount = req.body.tasks?.length || 0;
	for (let i = 0; i < taskCount; i++) {
		const labourCost = await quoteService.calculateRawLabourCost(req.body.tasks[i]);
		req.body.tasks[i].labourCost = labourCost;
	}
	next();
};

export const combineQuotes = async (req, res, next) => {
	// Combine multiple quotes into one, conditionally deleting old quotes
	const firstQuote = await quoteService.readQuote(req.body.first);
	const secondQuote = await quoteService.readQuote(req.body.second);
	const tasks = [...firstQuote.tasks, ...secondQuote.tasks];

	// Transform request
	req.body.tasks = tasks;
	delete req.body.first;
	delete req.body.second;
	next();
};
