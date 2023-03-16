import { useState, useEffect } from "react";
import QuoteList from "../QuoteList/QuoteList.js";
import { httpGet } from "../../utils/http.js";
import "./AdminQuotes.css";

const AdminQuotes = ({ selected, setSelected }) => {
	const [quotes, setQuotes] = useState([]);

	const onSuccess = (result) => {
		setQuotes(result.quotes);
	};

	const onError = (error) => {
		console.log(error);
	};
	
	useEffect(() => {
		httpGet("/quotes", onSuccess, onError);
		return () => setSelected(null);	// Clear selected when list dismounts
	}, [setSelected]);

	return (
		<section className="admin-quotes">
			<h2 className="admin-quotes__title">Admin Quote List</h2>
			<QuoteList quotes={quotes} selected={selected} setSelected={setSelected} />
		</section>
	);
};

export default AdminQuotes;
