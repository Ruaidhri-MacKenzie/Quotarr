import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config.js";

export const cookieName = "jwt";
export const cookieOptions = { httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 1 };

let blacklist = [];

export const addToBlacklist = (refreshToken) => {
	blacklist.push(refreshToken);
};

export const isBlacklisted = (refreshToken) => {
	return (blacklist.includes(refreshToken));
};

export const refreshBlacklist = () => {
	blacklist = blacklist.filter(refreshToken => refreshToken.exp > Date.now());
};

export const createAccessToken = (user) => {
	const accessToken = jwt.sign({ user }, JWT_ACCESS_SECRET, { expiresIn: "5m" });
	return accessToken;
};

export const createRefreshToken = (user) => {
	const refreshToken = jwt.sign({ user }, JWT_REFRESH_SECRET, { expiresIn: "1h" });
	return refreshToken;
};

export const decodeRefreshToken = (refreshToken) => {
	const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
	return decoded;
};

export const comparePassword = async (password, hash) => {
	const match = await bcrypt.compare(password, hash);
	return match;
};
