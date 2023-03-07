import useForm from "../../hooks/useForm.js";
import { httpPost } from "../../utils/http.js";
import "./SignUpForm.css";

const SignUpForm = ({ onSuccess }) => {
	const onError = (error) => {
		console.log(error);
	};

	const onSubmit = () => {
		if (state.password !== state.confirm) {
			console.log("Passwords must match");
			return;
		}

		httpPost("http://localhost:2000/auth/signup", state, onSuccess, onError);
	};

	const [state, handleInputChange, handleSubmit] = useForm(onSubmit);

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
