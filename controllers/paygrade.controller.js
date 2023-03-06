import Paygrade from "../models/paygrade.js";

const paygradeSelectString = "_id name rate createTime";

export const listPaygrades = async (req, res) => {
	try {
		const paygrades = await Paygrade.find().select(paygradeSelectString).exec();
		res.status(200).json({ paygrades });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const listPaygradeNames = async (req, res) => {
	try {
		const paygrades = await Paygrade.find().select("_id name").exec();
		res.status(200).json({ paygrades });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createPaygrade = async (req, res) => {
	try {
		const { name, rate } = req.body;

		// Create paygrade and extract data to plain object
		const paygrade = await Paygrade.create({ name, rate });
		const paygradeData = {
			_id: paygrade._id,
			name: paygrade.name,
			rate: paygrade.rate,
			createTime: paygrade.createTime,
		};

		res.status(201).json({ paygrade: paygradeData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readPaygrade = async (req, res) => {
	try {
		const id = req.params.id;
		const paygrade = await Paygrade.findById(id).select(paygradeSelectString).exec();
		if (paygrade) {
			res.status(200).json({ paygrade });
		}
		else {
			res.status(404).json({ error: "Paygrade not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updatePaygrade = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		const paygrade = await Paygrade.findOneAndUpdate({ _id: id }, { $set: data }).select(paygradeSelectString).exec();
		if (paygrade) {
			res.status(200).json({ paygrade });
		}
		else {
			res.status(404).json({ error: "Paygrade not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const removePaygrade = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await Paygrade.deleteOne({ _id: id }).exec();
		if (result.deletedCount) {
			res.status(200).json({ success: true });
		}
		else {
			res.status(404).json({ error: "Paygrade not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
