import bcrypt from "bcrypt";
import User from "../models/user.js";

export const listUsers = async (req, res) => {
	try {
		const users = await User.find().select("_id username quotes createTime").populate("quotes").exec();
		res.status(200).json(users);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Hash password for storage in database
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// Create user and extract data to plain object
		const user = await User.create({ username, password: hash });
		const userData = {
			_id: user._id,
			username: user.username,
			quotes: user.quotes,
			createTime: user.createTime,
		};

		res.status(201).json({ user: userData });
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const readUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id).select("_id username quotes createTime").populate("quotes").exec();
		res.status(200).json(user);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findOneAndUpdate({ _id: id}, {$set: data}).select("_id username quotes createTime").populate("quotes").exec();
		res.status(200).json(user);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const removeUser = async (req, res) => {
	try {
		const id = req.params.id;
		const success = await User.deleteOne({ _id: id }).exec();
		res.status(200).json(success);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};
