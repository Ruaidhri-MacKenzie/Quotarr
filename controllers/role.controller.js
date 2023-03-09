import Role from "../models/role.js";

const roleSelectString = "_id name rate timeCreated";

export const listRoles = async (req, res) => {
	try {
		const roles = await Role.find().select(roleSelectString).exec();
		res.status(200).json({ roles });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const listRoleNames = async (req, res) => {
	try {
		const roles = await Role.find().select("_id name").exec();
		res.status(200).json({ roles });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const createRole = async (req, res) => {
	try {
		const { name, rate } = req.body;

		// Create role and extract data to plain object
		const role = await Role.create({ name, rate });
		const roleData = {
			_id: role._id,
			name: role.name,
			rate: role.rate,
			timeCreated: role.timeCreated,
		};

		res.status(201).json({ role: roleData });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const readRole = async (req, res) => {
	try {
		const id = req.params.id;
		const role = await Role.findById(id).select(roleSelectString).exec();
		if (role) {
			res.status(200).json({ role });
		}
		else {
			res.status(404).json({ error: "Role not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const updateRole = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		const role = await Role.findOneAndUpdate({ _id: id }, { $set: data }).select(roleSelectString).exec();
		if (role) {
			res.status(200).json({ role });
		}
		else {
			res.status(404).json({ error: "Role not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const removeRole = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await Role.deleteOne({ _id: id }).exec();
		if (result.deletedCount) {
			res.status(200).json({ success: true });
		}
		else {
			res.status(404).json({ error: "Role not found" });
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};
