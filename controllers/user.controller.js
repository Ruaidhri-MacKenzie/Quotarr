import User from "../models/user.js";
import { userSelectString, hashPassword, extractUserData } from "../services/user.service.js";

export const listUsers = async (req, res) => {
	try {
		const users = await User.find().select(userSelectString).populate("quotes").exec();
		res.status(200).json({ users });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Hash password for storage in database
		const hash = await hashPassword(password);

		// Create user and extract data to plain object
		const user = await User.create({ username, password: hash });
		const userData = extractUserData(user);
		
		res.status(201).json({ user: userData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id).select(userSelectString).populate("quotes").exec();
		if (user) {
			res.status(200).json({ user });
		}
		else {
			res.status(404).json({ error: "User not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		if (data.admin) {
			res.status(403).json({ error: "Cannot change admin status" });
			return;
		}

		const user = await User.findOneAndUpdate({ _id: id }, { $set: data }).select(userSelectString).populate("quotes").exec();
		if (user) {
			res.status(200).json({ user });
		}
		else {
			res.status(404).json({ error: "User not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const removeUser = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await User.deleteOne({ _id: id }).exec();
		if (result.deletedCount) {
			res.status(200).json({ success: true });
		}
		else {
			res.status(404).json({ error: "User not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
