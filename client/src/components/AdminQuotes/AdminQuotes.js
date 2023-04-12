import { useState, useEffect } from "react";
import QuoteList from "../QuoteList/QuoteList.js";
import { httpGet } from "../../utils/http.js";
import Error from "../Error/Error.js";
import "./AdminQuotes.css";

const AdminQuotes = ({ selected, setSelected }) => {
	const [quotes, setQuotes] = useState([]);
	const [error, setError] = useState("");
	const handleError = (error) => setError(error);
	const resetError = () => setError("");

	const handleSuccess = (result) => {
		setQuotes(result.quotes);
	};
	
	useEffect(() => {
		httpGet("/quotes", handleSuccess, handleError);
		return () => setSelected(null);	// Clear selected when list dismounts
	}, [setSelected]);

	return (
		<section className="admin-quotes">
			<h2 className="admin-quotes__title">Admin Quote List</h2>
			<QuoteList quotes={quotes} selected={selected} setSelected={setSelected} />
			{error && <Error error={error} resetError={resetError} />}
		</section>
	);
};

export default AdminQuotes;
