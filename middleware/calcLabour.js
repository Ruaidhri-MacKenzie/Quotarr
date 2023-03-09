import { calculateLabourCost, calculateRawLabourCost } from "../services/quote.service.js";

export const calcLabour = (req, res, next) => {
	// Calculate labour costs with fudge factor
	req.body.tasks?.forEach(calculateLabourCost);
	next();
};

export const calcRawLabour = (req, res, next) => {
	// Calculate labour costs without fudge factor
	req.body.tasks?.forEach(calculateRawLabourCost);
	next();
};
