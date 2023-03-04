import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../config.js";

export const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.find({ username }).exec();
		if (!user) {
			res.status(401).json({ error: "Authentication failed" });
			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(401).json({ error: "Authentication failed" });
			return;
		}

		const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json(token);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const signOut = async (req, res) => {
	try {
		// Blacklist JWT
		res.status(200).json(null);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};
