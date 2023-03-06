import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config.js";

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
			admin: user.admin,
			quotes: user.quotes,
			createTime: user.createTime,
		};

		// Generate JWTs for stateless authentication
		const accessToken = jwt.sign({ user: userData }, JWT_ACCESS_SECRET, { expiresIn: "5m" });
		const refreshToken = jwt.sign({ user: userData }, JWT_REFRESH_SECRET, { expiresIn: "1h" });
		
		res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 1 });
		res.status(201).json({ user: userData, accessToken });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Get user record from database
		const user = await User.findOne({ username }).select("_id username password admin quotes createTime").populate("quotes").exec();
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
			admin: user.admin,
			quotes: user.quotes,
			createTime: user.createTime,
		};
		
		// Generate JWTs for stateless authentication
		const accessToken = jwt.sign({ user: userData }, JWT_ACCESS_SECRET, { expiresIn: "5m" });
		const refreshToken = jwt.sign({ user: userData }, JWT_REFRESH_SECRET, { expiresIn: "1h" });
		
		res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 1 });
		res.status(200).json({ user: userData, accessToken });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const signOut = async (req, res) => {
	try {
		// TODO

		// Blacklist JWT
		res.clearCookie("jwt", { httpOnly: true, sameSite: "none" });
		res.status(200).json({ success: true });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const refreshAccessToken = async (req, res) => {
	try {
		const refreshToken = req.cookies?.jwt;
		if (!refreshToken) {
			res.status(401).json({ error: "Authentication failed" });
			return;
		}

		const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
		const accessToken = jwt.sign({ user: decoded.user }, JWT_ACCESS_SECRET, { expiresIn: "5m" });
		
		res.status(200).json({ accessToken });
	}
	catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};
