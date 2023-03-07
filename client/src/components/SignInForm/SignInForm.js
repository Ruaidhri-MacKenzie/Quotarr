import { useState } from "react";
import "./SignInForm.css";

const SignInForm = () => {
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setState((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Sign In");
	};

	return (
		<form className="sign-in" onSubmit={handleSubmit}>
			<h2 className="sign-in__title">Sign In</h2>
			<label className="sign-in__username">
				<p className="sign-in__username-label">Username</p>
				<input className="sign-in__username-input" type="text" name="username" value={state.username} onChange={handleInputChange} />
			</label>
			<label className="sign-in__password">
				<p className="sign-in__password-label">Password</p>
				<input className="sign-in__password-input" type="password" name="password" value={state.password} onChange={handleInputChange} />
			</label>
			<button className="sign-in__submit" type="submit">Submit</button>
		</form>
	);
};

export default SignInForm;