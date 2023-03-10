import bcrypt from "bcrypt";
import User from "../models/user.js";

export const userSelectString = "_id username admin quotes timeCreated";

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
		timeCreated: user.timeCreated,
	};
};

export const addQuoteToUser = async (userId, quoteId) => {
	await User.findOneAndUpdate({ _id: userId }, { $push: { quotes: quoteId } }).exec();
};

export const removeQuoteFromUser = async (userId, quoteId) => {
	await User.findOneAndUpdate({ _id: userId }, { $pull: { quotes: quoteId } }).exec();
};

export const serializeUser = (user, done) => done(null, user._id);
export const deserializeUser = async (id, done) => {
	try {
		const user = await User.findById(id).select(userSelectString).populate("quotes").exec();
		done(null, user);
	}
	catch (error) {
		done(error);
	}
};
