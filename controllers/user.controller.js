import bcrypt from "bcrypt";
import User from "../models/user.js";

export const list = async (req, res) => {
	try {
		const users = await User.find().exec();
		res.status(200).json(users);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const create = async (req, res) => {
	try {
		const { username, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const user = await User.create({ username, password: hash });
		res.status(201).json(user);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const read = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id).exec();
		res.status(200).json(user);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findOneAndUpdate({ _id: id}, {$set: data}).exec();
		res.status(200).json(user);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const remove = async (req, res) => {
	try {
		const id = req.params.id;
		const success = await User.deleteOne({ _id: id }).exec();
		res.status(200).json(success);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};
