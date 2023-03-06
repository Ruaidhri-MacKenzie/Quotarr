import User from "../models/user.js";

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