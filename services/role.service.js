import Role from "../models/role.js";

const roleSelectString = "_id name rate createdAt updatedAt";

export const extractRoleData = (role) => {
	return {
		_id: role._id,
		name: role.name,
		rate: role.rate,
		createdAt: role.createdAt,
		updatedAt: role.updatedAt,
	};
}

export const listRoles = async (nameOnly) => {
	const selectString = (nameOnly) ? "_id name" : roleSelectString;
	const roles = await Role.find().select(selectString).exec();
	return roles;
};

export const createRole = async ({name, rate}) => {
	// Create role and extract data to plain object
	const role = await Role.create({ name, rate });
	const roleData = extractRoleData(role);
	return roleData;
};

export const readRole = async (id) => {
	const role = await Role.findById(id).select(roleSelectString).exec();
	return role;
};

export const updateRole = async (id, data) => {
	const role = await Role.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).select(roleSelectString).exec();
	return role;
};

export const deleteRole = async (id) => {
	const result = await Role.deleteOne({ _id: id }).exec();
	if (result.deletedCount) return true;
	else return false;
};
