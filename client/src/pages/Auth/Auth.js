import SignInForm from "../../components/SignInForm/SignInForm.js";
import SignUpForm from "../../components/SignUpForm/SignUpForm.js";
import "./Auth.css";

const Auth = ({ setUser }) => {
	const handleSignUp = (result) => {
		setUser(result.user);
	};
	
	const handleSignIn = (result) => {
		setUser(result.user);
	};

	return (
		<div className="auth">
			<h2 className="auth__title">Auth</h2>
			<div className="auth__forms">
				<SignInForm onSuccess={handleSignIn} />
				<SignUpForm onSuccess={handleSignUp} />
			</div>
		</div>
	);
};

export default Auth;
