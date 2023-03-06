import bcrypt from "bcrypt";

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
		createTime: user.createTime,
	};
};
