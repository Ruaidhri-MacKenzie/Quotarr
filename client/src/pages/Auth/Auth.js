import SignInForm from "../../components/SignInForm/SignInForm.js";
import SignUpForm from "../../components/SignUpForm/SignUpForm.js";
import "./Auth.css";

const Auth = () => {
	return (
		<div className="auth">
			<h2 className="auth__title">Auth</h2>
			<div className="auth__forms">
				<SignInForm />
				<SignUpForm />
			</div>
		</div>
	);
};

export default Auth;
