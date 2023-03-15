import Quote from "../models/quote.js";
import * as roleService from "./role.service.js";
import * as userService from "./user.service.js";

export const quoteSelectString = "_id name tasks createdAt updatedAt";

export const calculateLabourCost = async (task) => {
	const roles = await roleService.listRoles();

	let labourCost = 0;
	task.labour.forEach(line => {
		const role = roles.find(role => role.name === line.role);
		const rate = role?.rate || 0;
		const fudgeFactor = Math.random() + 0.55;
		labourCost += line.hours * rate * fudgeFactor;
	});

	return labourCost;
};

export const calculateRawLabourCost = async (task) => {
	const roles = await roleService.listRoles();
	let labourCost = 0;
	task.labour.forEach(line => {
		const role = roles.find(role => role.name === line.role);
		const rate = role?.rate || 0;
		labourCost += line.hours * rate;
	});
	return labourCost;
};

export const extractQuoteData = (quote) => {
	return {
		_id: quote._id,
		name: quote.name,
		tasks: quote.tasks,
		createdAt: quote.createdAt,
		updatedAt: quote.updatedAt,
	};
};

export const getQuoteTasks = async (id) => {
	const { tasks } = await Quote.findById(id).select("tasks").exec();
	return tasks;
};

export const listQuotes = async () => {
	const quotes = await Quote.find().select(quoteSelectString).exec();
	return quotes;
};

export const createQuote = async (userId, { name, tasks }) => {
	const quote = await Quote.create({ name, tasks });
	await userService.addQuoteToUser(userId, quote._id);
	const quoteData = extractQuoteData(quote);
	return quoteData;
};

export const readQuote = async (id) => {
	const quote = await Quote.findById(id).select(quoteSelectString).exec();
	return quote;
};

export const updateQuote = async (id, { name, tasks }) => {
	const quote = await Quote.findOneAndUpdate({ _id: id }, { $set: { name, tasks } }, { new: true }).select(quoteSelectString).exec();
	return quote;
};

export const deleteQuote = async (id) => {
	const result = await Quote.deleteOne({ _id: id }).exec();
	if (result.deletedCount) {
		const userId = await userService.getQuoteOwnerId(id);
		await userService.removeQuoteFromUser(userId, id);
		return true;
	}
	else {
		return false;
	}
};
