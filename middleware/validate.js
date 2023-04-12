import { checkUsernameExists } from "../services/user.service.js";
import { checkRoleNameExists } from "../services/role.service.js";

export const validateCredentials = (req, res, next) => {
	// Validate sign up and sign in details
	const { username, password } = req.body;

	if (!username || username.length < 3) {
		res.status(400).json({ error: "Username must be at least 3 characters" });
	}
	else if (username.length > 20) {
		res.status(400).json({ error: "Username must be at most 20 characters" });
	}
	else if (!password || password.length < 8) {
		res.status(400).json({ error: "Password must be at least 8 characters" });
	}
	else if (password.length > 32) {
		res.status(400).json({ error: "Password must be at most 32 characters" });
	}
	else if (!password.match(/[a-z]/)) {
		res.status(400).json({ error: "Password must contain at least one lowercase character" });
	}
	else if (!password.match(/[A-Z]/)) {
		res.status(400).json({ error: "Password must contain at least one uppercase character" });
	}
	else if (!password.match(/[#?!@$%^&*-]/)) {
		res.status(400).json({ error: "Password must contain at least one special character: #?!@$%^&*-" });
	}
	else if (!password.match(/[0-9]/)) {
		res.status(400).json({ error: "Password must contain at least one number" });
	}
	else {
		next();
	}
};

export const checkUniqueUsername = async (req, res, next) => {
	const userExists = await checkUsernameExists(req.body.username);
	if (userExists) {
		res.status(400).json({ error: "Username already exists, please choose another" });
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

export const validateRole = (req, res, next) => {
	const { name, rate } = req.body;

	if (!name || name.length < 3) {
		res.status(400).json({ error: "Name must be at least 3 characters" });
	}
	else if (name.length > 20) {
		res.status(400).json({ error: "Name must be at most 20 characters" });
	}
	else if (!rate || isNaN(rate) || rate < 0) {
		res.status(400).json({ error: "Rate must be a positive number" });
	}
	else {
		next();
	}
};

export const checkUniqueRoleName = async (req, res, next) => {
	const roleExists = await checkRoleNameExists(req.body.name);
	if (roleExists) {
		res.status(400).json({ error: "Role already exists with that name" });
	}
	else {
		next();
	}
};
