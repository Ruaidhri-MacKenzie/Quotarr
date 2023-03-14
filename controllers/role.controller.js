import * as roleService from "../services/role.service.js";

export const listRoles = async (req, res) => {
	try {
		const roles = await roleService.listRoles(!req.user.admin);
		res.status(200).json({ roles });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createRole = async (req, res) => {
	try {
		// Create role and extract data to plain object
		const role = await roleService.createRole(req.body);
		res.status(201).json({ role });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readRole = async (req, res) => {
	try {
		const role = await roleService.readRole(req.params.id);
		if (role) res.status(200).json({ role });
		else res.status(404).json({ error: "Role not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateRole = async (req, res) => {
	try {
		const role = await roleService.updateRole(req.params.id, req.body);
		if (role) res.status(200).json({ role });
		else res.status(404).json({ error: "Role not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const deleteRole = async (req, res) => {
	try {
		const success = await roleService.deleteRole(req.params.id);
		if (success) res.status(200).json({ success: true });
		else res.status(404).json({ error: "Role not found" });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
