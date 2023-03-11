import useForm from "../../hooks/useForm.js";
import { httpPost } from "../../utils/http.js";
import "./AuthForm.css";

const AuthForm = ({ isSignUp, onSuccess }) => {
	const onError = (error) => {
		console.log(error);
	};

	const onSubmit = () => {
		if (isSignUp && state.password !== state.confirm) {
			console.log("Passwords must match");
			return;
		}

		const endpoint = (isSignUp) ? "signup" : "signin";
		httpPost(`http://localhost:2000/auth/${endpoint}`, state, onSuccess, onError);
	};

	const [state, handleInputChange, handleSubmit] = useForm(onSubmit);

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2 className="auth-form__title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
			
			<label className="auth-form__input-container">
				<p className="auth-form__label">Username</p>
				<input className="auth-form__input" type="text" name="username" value={state.username || ""} onChange={handleInputChange} />
			</label>

			<label className="auth-form__input-container">
				<p className="auth-form__label">Password</p>
				<input className="auth-form__input" type="password" name="password" value={state.password || ""} onChange={handleInputChange} />
			</label>

			{isSignUp && (<label className="auth-form__input-container">
				<p className="auth-form__label">Confirm Password</p>
				<input className="auth-form__input" type="password" name="confirm" value={state.confirm || ""} onChange={handleInputChange} />
			</label>)}

			<button className="auth-form__submit" type="submit">Submit</button>
		</form>
	);
};

export default AuthForm;