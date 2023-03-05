import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../config.js";

export const signUp = async (req, res) => {
	try {
		const {username, password } = req.body;

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

		// Generate a JWT for stateless authentication
		const token = jwt.sign({ user: userData }, JWT_SECRET, { expiresIn: "1h" });
		
		res.status(201).json({ user: userData, token });
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Get user record from database
		const user = await User.findOne({ username }).select("_id username password quotes createTime").populate("quotes").exec();
		if (!user) {
			res.status(401).json({ error: "Incorrect username or password" });
			return;
		}

		// Check that the given password matches the stored hash
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(401).json({ error: "Incorrect username or password" });
			return;
		}

		// Extract user data to plain object
		const userData = {
			_id: user._id,
			username: user.username,
			quotes: user.quotes,
			createTime: user.createTime,
		};
		
		// Generate a JWT for stateless authentication
		const token = jwt.sign({ user: userData }, JWT_SECRET, { expiresIn: "1h" });

		res.status(200).json({ user: userData, token });
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
