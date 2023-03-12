import { calculateLabourCost, calculateRawLabourCost } from "../services/quote.service.js";

export const calcLabour = async (req, res, next) => {
	// Calculate labour costs with fudge factor
	const taskCount = req.body.tasks?.length || 0;
	for (let i = 0; i < taskCount; i++) {
		const labourCost = await calculateLabourCost(req.body.tasks[i]);
		req.body.tasks[i].labourCost = labourCost;
	}
	next();
};

export const calcRawLabour = async (req, res, next) => {
	// Calculate labour costs without fudge factor
	const taskCount = req.body.tasks?.length || 0;
	for (let i = 0; i < taskCount; i++) {
		const labourCost = await calculateRawLabourCost(req.body.tasks[i]);
		req.body.tasks[i].labourCost = labourCost;
	}
	next();
};
