import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config.js";

export const isAuth = (req, res, next) => {
	try {
		// Check if access token exists and it has not expired
		const decoded = jwt.verify(req.headers.authorization.split(" ")[1], JWT_ACCESS_SECRET);
		req.user = decoded.user;
		next();
	}
	catch (error) {
		res.status(401).json({ error: "Authentication failed" });
	}
};

export const isAdmin = (req, res, next) => {
	// Check if user is an admin
	if (req.user.admin) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isUserOwner = (req, res, next) => {
	// Check param id matches the user id (or admin)
	if (req.user.admin || req.params.id === req.user._id) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isQuoteOwner = (req, res, next) => {
	// Check param id is included in user quote ids (or admin)
	if (req.user.admin || req.user.quotes.some(quote => quote._id === req.params.id)) next();
	else res.status(403).json({ error: "Authorisation failed" });
};
