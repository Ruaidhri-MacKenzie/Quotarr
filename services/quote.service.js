import Paygrade from "../models/paygrade.js";

export const calculateRawLabourCost = async (task) => {
	const paygrades = await Paygrade.find().select("_id name rate").exec();
	let labourCost = 0;
	task.labour.forEach(line => {
		const paygrade = paygrades.find(grade => grade.name === line.grade);
		labourCost += line.hours * paygrade.rate;
	});
	task.labourCost = labourCost;
	delete task.labour;
	return task;
};

export const calculateLabourCost = async (task) => {
	const paygrades = await Paygrade.find().select("_id name rate").exec();
	let labourCost = 0;
	task.labour.forEach(line => {
		const paygrade = paygrades.find(grade => grade.name === line.grade);
		const fudgeFactor = Math.random() + 0.5;
		labourCost += line.hours * paygrade.rate * fudgeFactor;
	});
	task.labourCost = labourCost;
	delete task.labour;
	return task;
};

export const extractQuoteData = (quote) => {
	return {
		_id: quote._id,
		tasks: quote.tasks,
		createTime: quote.createTime,
	};
};
