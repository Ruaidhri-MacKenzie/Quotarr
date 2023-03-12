import * as userService from "../services/user.service.js";

export const listUsers = async (req, res) => {
	try {
		const users = await userService.listUsers();
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
		const user = await userService.createUser(username, password);
		res.status(201).json({ user });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readUser = async (req, res) => {
	try {
		const user = await userService.readUser(req.params.id);
		if (user) res.status(200).json({ user });
		else res.status(404).json({ error: "User not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateUser = async (req, res) => {
	try {
		if (!req.user.admin && req.body.admin) {
			res.status(403).json({ error: "Cannot change admin status" });
			return;
		}

		const user = await userService.updateUser(req.params.id, req.body);
		if (user) res.status(200).json({ user });
		else res.status(404).json({ error: "User not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const success = await userService.deleteUser(req.params.id);
		if (success) res.status(200).json({ success });
		else res.status(404).json({ error: "User not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
