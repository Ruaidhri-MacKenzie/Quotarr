export const sanitiseString = (input) => {
	return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export const sanitiseTasks = (tasks) => {
	return tasks.map(task => {
		task.name = sanitiseString(task.name);
		
		task.labour = task.labour.map(line => {
			line.role = sanitiseString(line.role);
			return line;
		});
		
		task.items = task.items.map(line => {
			line.name = sanitiseString(line.name);
			return line;
		});

		return task;
	});
};

export const sanitiseRole = (role) => {
	role.name = sanitiseString(role.name);
	return role;
};

export const sanitiseCombine = (combine) => {
	combine.name = sanitiseString(combine.name);
	combine.first = sanitiseString(combine.first);
	combine.second = sanitiseString(combine.second);
	return combine;
};
