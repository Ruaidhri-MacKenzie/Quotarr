import User from "../models/user.js";

export const validateCredentials = (req, res, next) => {
	// Validate sign up and sign in details
	req.body.username = req.body.username?.trim();
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

export const validateQuote = (req, res, next) => {
	// Validate new quote details
	const { name, tasks } = req.body;

	if (!name) {
		res.status(400).json({ error: "Must include a quote name" });
	}
	else if (name.length > 30) {
		res.status(400).json({ error: "Quote name must be at most 30 characters" });
	}
	else if (!tasks || !tasks.length) {
		res.status(400).json({ error: "Must include at least one task" });
	}
	else if (tasks.reduce((total, task) => total += task.labour.length, 0) === 0) {
		res.status(400).json({ error: "Must include at least one labour line" });
	}
	else {
		next();
	}
};

export const validateCombineQuotes = (req, res, next) => {
	const { name, first, second } = req.body;

	if (!name) {
		res.status(400).json({ error: "Must include a quote name" });
	}
	else if (name.length > 30) {
		res.status(400).json({ error: "Quote name must be at most 30 characters" });
	}
	else if (!first || !second) {
		res.status(400).json({ error: "Must include the quotes to be combined" });
	}
	else {
		next();
	}
};

export const checkUniqueRoleName = async (req, res, next) => {
	const name = req.body.name;
	const roleExists = await User.findOne({ name }).exec();
	if (roleExists) {
		res.status(400).json({ error: "Role already exists with that name" });
	}
	else {
		next();
	}
};
