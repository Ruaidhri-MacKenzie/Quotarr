export const isAuth = (req, res, next) => {
	// Check if user is authenticated
	if (req.isAuthenticated()) next();
	else res.status(401).json({ error: "Authentication failed" });
};

export const isNotAuth = (req, res, next) => {
	// Check if user is not authenticated
	if (!req.isAuthenticated()) next();
	else res.status(403).json({ error: "Authorisation failed" });
};

export const isAdmin = (req, res, next) => {
	// Check if user is an admin
	if (!req.isAuthenticated()) res.status(401).json({ error: "Authentication failed" });
	else if (!req.user.admin) res.status(403).json({ error: "Authorisation failed" });
	else next();
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
