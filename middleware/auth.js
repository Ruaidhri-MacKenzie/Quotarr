export const isAuth = (req, res, next) => {
	if (true) next();
	else res.status(401).json({});
};

export const isNotAuth = (req, res, next) => {
	if (true) next();
	else res.status(403).json({});
};

export const isAdmin = (req, res, next) => {
	if (true) next();
	else res.status(403).json({});
};
