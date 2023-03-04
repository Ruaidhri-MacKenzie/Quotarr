import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const isAuth = (req, res, next) => {
	try {
		req.user = jwt.verify(req.headers.authorization.split(" ")[1], JWT_SECRET);
		next();
	}
	catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

export const isNotAuth = (req, res, next) => {
	if (true) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isAdmin = (req, res, next) => {
	if (true) next();
	else res.status(403).json({ error: "Authorisation failed" });
};
