import SignInForm from "../../components/SignInForm/SignInForm.js";
import SignUpForm from "../../components/SignUpForm/SignUpForm.js";
import "./Auth.css";

const Auth = ({ setUser, setAccessToken }) => {
	const handleSuccess = (result) => {
		setUser(result.user);
		setAccessToken(result.accessToken);
	};
	
	const handleError = (error) => {
		console.log(error);
	};

	return (
		<div className="auth">
			<h2 className="auth__title">Auth</h2>
			<div className="auth__forms">
				<SignInForm onSuccess={handleSuccess} onError={handleError} />
				<SignUpForm onSuccess={handleSuccess} onError={handleError} />
			</div>
		</div>
	);
};

export default Auth;
