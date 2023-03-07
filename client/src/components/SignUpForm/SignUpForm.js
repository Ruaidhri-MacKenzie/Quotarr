import { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ onSuccess, onError }) => {
	const [state, setState] = useState({ username: "", password: "", confirm: "" });

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setState((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch("http://localhost:2000/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: state.username,
				password: state.password,
			}),
		})
		.then(response => response.json())
		.then(result => {
			if (result.error) {
				onError(result.error);
			}
			else {
				onSuccess(result);
			}
		});
	};

	return (
		<form className="sign-up" onSubmit={handleSubmit}>
			<h2 className="sign-up__title">Sign Up</h2>
			<label className="sign-up__username">
				<p className="sign-up__username-label">Username</p>
				<input className="sign-up__username-input" type="text" name="username" value={state.username} onChange={handleInputChange} />
			</label>
			<label className="sign-up__password">
				<p className="sign-up__password-label">Password</p>
				<input className="sign-up__password-input" type="password" name="password" value={state.password} onChange={handleInputChange} />
			</label>
			<label className="sign-up__confirm">
				<p className="sign-up__confirm-label">Confirm Password</p>
				<input className="sign-up__confirm-input" type="password" name="confirm" value={state.confirm} onChange={handleInputChange} />
			</label>
			<button className="sign-up__submit" type="submit">Submit</button>
		</form>
	);
};

export default SignUpForm;
