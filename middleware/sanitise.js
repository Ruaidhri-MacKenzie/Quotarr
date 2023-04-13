export const sanitiseCredentials = (req, res, next) => {
	if (req.body.username) {
		req.body.username = req.body.username.trim();
		req.body.username = req.body.username.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	if (req.body.password) {
		req.body.password = req.body.password.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	next();
};

export const sanitiseQuote = (req, res, next) => {
	if (req.body.name) {
		req.body.name = req.body.name.trim();
		req.body.name = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	if (req.body.tasks) {
		req.body.tasks = req.body.tasks.map(task => {
			task.name = task.name?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			
			task.labour = task.labour?.map(line => {
				line.role = line.role?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return line;
			});
			
			task.items = task.items?.map(line => {
				line.name = line.name?.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return line;
			});
	
			return task;
		});
	}
	next();
};

export const sanitiseCombineQuotes = (req, res, next) => {
	if (req.body.name) {
		req.body.name = req.body.name.trim();
		req.body.name = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	next();
};

export const sanitiseRole = (req, res, next) => {
	if (req.body.name) {
		req.body.name = req.body.name.trim();
		req.body.name = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	if (req.body.rate) {
		req.body.rate = Number(req.body.rate);
	}
	next();
};
