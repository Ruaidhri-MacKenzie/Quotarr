import AuthForm from "../../components/AuthForm/AuthForm.js";
import "./Auth.css";

const Auth = ({ setUser }) => {
	const signIn = (result) => {
		setUser(result.user);
	};

	return (
		<div className="auth">
			<h2 className="auth__title">Auth</h2>
			<div className="auth__forms">
				<AuthForm isSignUp={false} onSuccess={signIn} />
				<AuthForm isSignUp={true} onSuccess={signIn} />
			</div>
		</div>
	);
};

export default Auth;
