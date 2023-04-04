import AuthForm from "../../components/AuthForm/AuthForm.js";
import "./Auth.css";

const Auth = ({ signIn }) => {
	return (
		<main className="auth">
			<h2 className="auth__title">Welcome to Quotarr</h2>
			<div className="auth__forms">
				<AuthForm isSignUp={false} signIn={signIn} />
				<AuthForm isSignUp={true} signIn={signIn} />
			</div>
		</main>
	);
};

export default Auth;
