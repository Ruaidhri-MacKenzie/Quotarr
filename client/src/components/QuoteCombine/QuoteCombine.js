import { useState } from "react";
import { httpPost } from "../../utils/http";
import "./QuoteCombine.css";

const QuoteCombine = ({ quotes, setUser, setSelected }) => {
	const [state, setState] = useState({});

	const handleChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSuccess = (result) => {
		setUser(current => ({ ...current, quotes: [...current.quotes, result.quote] }));
		setSelected(result.quote);
		setState({});
	};

	const handleError = (error) => console.log(error);

	const handleSubmit = (event) => {
		event.preventDefault();
		httpPost("/quotes/combine", state, handleSuccess, handleError);
	};

	return (
		<form className="quote-combine" onSubmit={handleSubmit}>
			<h2 className="quote-combine__title">Combine Quotes</h2>

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

			<button className="quote-combine__submit" type="submit">Combine Quotes</button>
		</form>
	);
};

export default QuoteCombine;
