import Role from "../models/role.js";

export const calculateRawLabourCost = async (task) => {
	const roles = await Role.find().select("_id name rate").exec();
	let labourCost = 0;
	task.labour.forEach(line => {
		const role = roles.find(role => role.name === line.name);
		labourCost += line.hours * role.rate;
	});
	task.labourCost = labourCost;
	delete task.labour;
	return task;
};

export const calculateLabourCost = async (task) => {
	const roles = await Role.find().select("_id name rate").exec();
	let labourCost = 0;
	task.labour.forEach(line => {
		const role = roles.find(role => role.name === line.name);
		const rate = role?.rate || 0;
		const fudgeFactor = Math.random() + 0.5;
		labourCost += line.hours * rate * fudgeFactor;
	});
	task.labourCost = labourCost;
	delete task.labour;
	return task;
};

export const extractQuoteData = (quote) => {
	return {
		_id: quote._id,
		name: quote.name,
		tasks: quote.tasks,
		timeCreated: quote.timeCreated,
	};
};
