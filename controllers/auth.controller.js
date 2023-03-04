import User from "../models/user.js";

export const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		res.status(200).json(null);
	}
	catch (error) {
		res.status(500).json(error);
	}
};

export const signOut = async (req, res) => {
	try {
		res.status(200).json(null);
	}
	catch (error) {
		res.status(500).json(error);
	}
};
