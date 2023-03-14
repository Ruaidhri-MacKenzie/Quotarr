import passport from "passport";
import * as userService from "../services/user.service.js";

export const signUp = async (req, res, next) => {
	const {username, password } = req.body;
	const user = await userService.createUser(username, password);
	
	req.login(user, (err) => {
		if (err) return next(err);
		return res.status(201).json({ user });
	});
};

export const signIn = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.redirect("/auth/failed/auth");
		
		req.login(user, async (err) => {
			if (err) return next(err);
			const userData = userService.extractUserData(user);
			return res.status(200).json({ user: userData });
		});
	})(req, res, next);
};

export const signOut = (req, res, next) => {
	req.logout((err) => {
    if (err) { return next(err); }

		req.session.destroy((err) => {
			if (err) return res.status(500).json({ error: "Server error. Please contact administrator." });
			return res.status(200).clearCookie("sessionId", { path: "/" }).json({ message: "Signed out" });
		});
	});
};

export const cookieSignIn = (req, res) => {
	const user = userService.extractUserData(req.user);
	res.status(200).json({ user });
};
