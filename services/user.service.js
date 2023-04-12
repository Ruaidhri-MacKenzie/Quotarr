import bcrypt from "bcrypt";
import User from "../models/user.js";

export const userSelectString = "_id username admin quotes createdAt updatedAt";

export const hashPassword = async (password) => {
	// Hash password for storage in database
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const extractUserData = (user) => {
	return {
		_id: user._id,
		username: user.username,
		admin: user.admin,
		quotes: user.quotes,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};

export const checkUsernameExists = async (username) => {
	const usernameExists = await User.findOne({ username }).exec();
	return !!usernameExists;
};

export const addQuoteToUser = async (userId, quoteId) => {
	await User.findOneAndUpdate({ _id: userId }, { $push: { quotes: quoteId } }).exec();
};

export const removeQuoteFromUser = async (userId, quoteId) => {
	await User.findOneAndUpdate({ _id: userId }, { $pull: { quotes: quoteId } }).exec();
};

export const getQuoteOwnerId = async (quoteId) => {
	const { _id } = await User.findOne({ quotes: quoteId }).select("_id").exec();
	return _id;
};

export const listUsers = async () => {
	const users = await User.find().select(userSelectString).populate("quotes").exec();
	return users;
};

export const createUser = async (username, password) => {
	// Create user with hashed password and extract data to plain object
	const user = await User.create({ username, password });
	const userData = extractUserData(user);
	return userData;
};

export const readUser = async (id) => {
	const user = await User.findById(id).select(userSelectString).populate("quotes").exec();
	return user;
};

export const updateUser = async (id, data) => {
	const user = await User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).select(userSelectString).populate("quotes").exec();
	return user;
};

export const deleteUser = async (id) => {
	const result = await User.deleteOne({ _id: id }).exec();
	if (result.deletedCount) return true;
	else return false;
};
