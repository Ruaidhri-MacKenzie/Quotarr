import "./SignUpForm.css";

const SignUpForm = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Sign Up");
	};

	return (
		<form className="sign-up" onSubmit={handleSubmit}>
			<h2 className="sign-up__title">Sign Up</h2>
			<label className="sign-up__username">
				<p className="sign-up__username-label">Username</p>
				<input className="sign-up__username-input" type="text" name="username" />
			</label>
			<label className="sign-up__password">
				<p className="sign-up__password-label">Password</p>
				<input className="sign-up__password-input" type="password" name="password" />
			</label>
			<label className="sign-up__confirm">
				<p className="sign-up__confirm-label">Confirm Password</p>
				<input className="sign-up__confirm-input" type="password" />
			</label>
			<button className="sign-up__submit" type="submit">Submit</button>
		</form>
	);
};

export default SignUpForm;
