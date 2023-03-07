import passport from "passport";
import User from "../models/user.js";
import { extractUserData, hashPassword } from "../services/user.service.js";

export const signUp = async (req, res, next) => {
	const {username, password } = req.body;
	const hash = await hashPassword(password);
	const user = await User.create({ username, password: hash });
	
	req.login(user, (err) => {
		if (err) return next(err);
		const userData = extractUserData(user);
		return res.status(201).json({ user: userData });
	});
};

export const signIn = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.redirect("/auth/failed/auth");
		
		req.login(user, async (err) => {
			if (err) return next(err);			
			const userData = extractUserData(user);
			return res.status(200).json({ user: userData });
		});
	})(req, res, next);
};

export const signOut = (req, res, next) => {
	req.logout();
	req.session.destroy(err => {
		if (err) return res.status(500).json({ error: "Server error. Please contact administrator." });
		return res.status(200).clearCookie("sessionId", { path: "/" }).json({ message: "Signed out" });
	});
};

export const cookieSignIn = (req, res) => {
	res.status(200).json({ user: req.user });
};
