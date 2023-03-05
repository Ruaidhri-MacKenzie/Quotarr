import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_ACCESS_SECRET } from "../config.js";

export const isAuth = (req, res, next) => {
	try {
		// Check if access token exists and it has not expired
		const decoded = jwt.verify(req.headers.authorization.split(" ")[1], JWT_ACCESS_SECRET);
		req.user = decoded.user;
		next();
	}
	catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

export const isNotAuth = (req, res, next) => {
	// TODO

	// Check if no access token exists or if it has expired
	if (!req.headers.authorization) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isAdmin = (req, res, next) => {
	// TODO

	// Check if user is an admin
	const admin = true;
	if (admin) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isUserOwner = (req, res, next) => {
	// TODO

	// Check param id matches the user id (or admin)
	const admin = true;
	if (admin || req.params.id === req.user._id) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isQuoteOwner = (req, res, next) => {
	// TODO
	
	// Check param id is included in user quote ids (or admin)
	const admin = true;
	if (admin || req.user.quotes.some(quote => quote._id === req.params.id)) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const validateCredentials = (req, res, next) => {
	// Validate sign up and sign in details
	const { username, password } = req.body;

	if (!username || username.length < 3) {
		res.status(400).json({ error: "Username must be at least 3 characters" });
	}
	else if (username.length > 20) {
		res.status(400).json({ error: "Username must be at most 20 characters" });
	}
	else if (!password || password.length < 6) {
		res.status(400).json({ error: "Password must be at least 6 characters" });
	}
	else if (password.length > 32) {
		res.status(400).json({ error: "Password must be at most 32 characters" });
	}
	else {
		next();
	}
};

export const checkUniqueUsername = async (req, res, next) => {
	const username = req.body.username;
	const userExists = await User.findOne({ username }).exec();
	if (userExists) {
		res.status(400).json({ error: "Username already exists" });
	}
	else {
		next();
	}
};
