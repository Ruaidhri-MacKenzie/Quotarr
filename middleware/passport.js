import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const localStrategy = new Strategy(async (username, password, done) => {
	try {
		if (!username) return done(null, false, { message: "Username is required" });
		if (!password) return done(null, false, { message: "Password is required" });

		const user = await User.findOne({ username }).exec();
		if (!user) {
			return done(null, false, { message: "Invalid username or password" });
		}
		
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return done(null, false, { message: "Invalid username or password" });
		}

		done(null, user);
	}
	catch (error) {
		done(error);
	}
});

export const serializeUser = (user, done) => done(null, user);
export const deserializeUser = (user, done) => done(null, user);

// export const serializeUser = (user, done) => done(null, user._id);
// export const deserializeUser = async (id, done) => {
// 	try {
// 		const user = await User.findById(id).select("_id username admin quotes timeCreated").populate("quotes").exec();
// 		done(null, user);
// 	}
// 	catch (error) {
// 		done(error);
// 	}
// };
