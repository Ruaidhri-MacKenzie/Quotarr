export const validateCredentials = (state, isSignUp) => {
	if (!state.username || state.username.length < 3) {
		return "Username must be at least 3 characters";
	}
	else if (state.username.length > 20) {
		return "Username must be at most 20 characters";
	}
	else if (!state.password || state.password.length < 8) {
		return "Password must be at least 8 characters";
	}
	else if (state.password.length > 32) {
		return "Password must be at most 32 characters";
	}
	else if (isSignUp && state.password !== state.confirm) {
		return "Passwords must match";
	}
	else if (!state.password.match(/[a-z]/)) {
		return "Password must contain at least one lowercase character";
	}
	else if (!state.password.match(/[A-Z]/)) {
		return "Password must contain at least one uppercase character";
	}
	else if (!state.password.match(/[#?!@$%^&*-]/)) {
		return "Password must contain at least one special character: #?!@$%^&*-";
	}
	else if (!state.password.match(/[0-9]/)) {
		return "Password must contain at least one number";
	}
	else {
		return null;
	}
};

export const validateQuote = (state) => {
	if (!state.name) {
		return "Must include a quote name";
	}
	else if (state.name.length > 30) {
		return "Quote name must be at most 30 characters";
	}
	else if (!state.tasks || !state.tasks.length) {
		return "Must include at least one task";
	}
	else if (state.tasks.reduce((total, task) => total += task.labour.length, 0) === 0) {
		return "Must include at least one labour line";
	}
	else {
		return null;
	}
};

export const validateCombine = (state) => {
	if (!state.name) {
		return "Must include a quote name";
	}
	else if (!state.first || !state.second) {
		return "Must select two quotes to combine";
	}
	else {
		return null;
	}
};
