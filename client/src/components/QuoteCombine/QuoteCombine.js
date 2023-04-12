import { useState } from "react";
import { httpPost } from "../../utils/http.js";
import { validateCombine } from "../../utils/validate.js";
import { sanitiseCombine } from "../../utils/sanitise.js";
import Error from "../Error/Error.js";
import "./QuoteCombine.css";

const QuoteCombine = ({ quotes, setUser, setSelected, admin }) => {
	const [state, setState] = useState({});
	const [error, setError] = useState("");
	const handleError = (error) => setError(error);
	const resetError = () => setError("");

	const handleChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSuccess = (result) => {
		setUser(current => ({ ...current, quotes: [...current.quotes, result.quote] }));
		setSelected(result.quote);
		setState({});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Validate combine quote - name and two quote ids
		const validationError = validateCombine(state);
		if (validationError) {
			setError(validationError);
			return;
		}

		// Sanitise inputs to protect against XSS attacks
		const sanitisedState = sanitiseCombine(state);

		if (admin) {
			httpPost("/quotes/raw/combine", sanitisedState, handleSuccess, handleError);
		}
		else {
			httpPost("/quotes/combine", sanitisedState, handleSuccess, handleError);
		}
	};

	return (
		<form className="quote-combine" onSubmit={handleSubmit}>
			<h2 className="quote-combine__title">{admin ? "Combine Exact Quotes" : "Combine Quotes"}</h2>

			<label className="quote-combine__name">
				<p className="quote-combine__label">Combined Quote Name</p>
				<input className="quote-combine__input" type="text" name="name" value={state.name || ""} onChange={handleChange} />
			</label>
			<select className="quote-combine__select" name="first" value={state.first || ""} onChange={handleChange}>
				<option value="" disabled>Select a quote</option>
				{quotes.map((quote, index) => <option key={(quote._id || "") + index} value={quote._id}>{quote.name}</option>)}
			</select>

			<select className="quote-combine__select" name="second" value={state.second || ""} onChange={handleChange}>
				<option value="" disabled>Select a quote</option>
				{quotes.map((quote, index) => <option key={(quote._id || "") + index} value={quote._id}>{quote.name}</option>)}
			</select>

			{error && <Error error={error} resetError={resetError} />}
			<button className="quote-combine__submit" type="submit" disabled={(!state.name || !state.first || !state.second)}>Combine Quotes</button>
		</form>
	);
};

export default QuoteCombine;
