import User from "../models/user.js";
import { extractUserData, hashPassword } from "../services/user.service.js";
import { cookieName, cookieOptions, comparePassword, createAccessToken, createRefreshToken, decodeRefreshToken } from "../services/auth.service.js";

export const signUp = async (req, res) => {
	try {
		const {username, password } = req.body;

		// Hash password for storage in database
		const hash = await hashPassword(password);
		
		// Create user and extract data to plain object
		const user = await User.create({ username, password: hash });
		const userData = extractUserData(user);

		// Generate JWTs for stateless authentication
		const accessToken = createAccessToken(userData);
		const refreshToken = createRefreshToken(userData);
		
		res.cookie(cookieName, refreshToken, cookieOptions);
		res.status(201).json({ user: userData, accessToken });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Get user record from database
		const user = await User.findOne({ username }).select("_id username password admin quotes createTime").populate("quotes").exec();
		if (!user) {
			res.status(401).json({ error: "Incorrect username or password" });
			return;
		}

		// Check that the given password matches the stored hash
		const match = await comparePassword(password, user.password);
		if (!match) {
			res.status(401).json({ error: "Incorrect username or password" });
			return;
		}

		// Extract user data to plain object
		const userData = extractUserData(user);
		
		// Generate JWTs for stateless authentication
		const accessToken = createAccessToken(userData);
		const refreshToken = createRefreshToken(userData);
		
		res.cookie(cookieName, refreshToken, cookieOptions);
		res.status(200).json({ user: userData, accessToken });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const signOut = async (req, res) => {
	try {
		// TODO

		// Blacklist JWT
		res.clearCookie(cookieName, cookieOptions);
		res.status(200).json({ success: true });
	}
	catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error. Please contact administrator." });
	}
};

export const refreshAccessToken = async (req, res) => {
	try {
		const refreshToken = req.cookies[cookieName];
		if (!refreshToken) {
			res.status(401).json({ error: "Authentication failed" });
			return;
		}

		const decoded = decodeRefreshToken(refreshToken);
		const accessToken = createAccessToken(decoded.user);
		
		res.status(200).json({ accessToken });
	}
	catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};
