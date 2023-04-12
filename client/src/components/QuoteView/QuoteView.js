import { useState, useEffect } from "react";
import TaskView from "../TaskView/TaskView";
import { httpDelete } from "../../utils/http.js";
import Error from "../Error/Error.js";
import "./QuoteView.css";

const QuoteView = ({ quote, setUser, setSelected, editSelected, setEditSelected }) => {
	const [total, setTotal] = useState(0);
	const [error, setError] = useState("");
	const resetError = () => setError("");

	useEffect(() => {
		if (!quote) {
			setEditSelected(false);
		}
		else if (quote.tasks) {
			setTotal(quote.tasks.reduce((total, task) => {
				return total += task.labourCost + task.items.reduce((subtotal, line) => {
					return subtotal += (line.cost * line.quantity);
				}, 0);
			}, 0));
		}
	}, [quote, setEditSelected]);

	// Toggle edit/create quote
	const editQuote = (event) => setEditSelected(true);
	const cancelEditQuote = (event) => setEditSelected(false);

	// Delete a quote owned by the user
	const deleteQuote = (event) => {
		const confirmed = window.confirm(`You are about to delete quote ${quote.name}, is that correct?`);
		if (!confirmed) return;
		httpDelete(`/quotes/${event.target.dataset.id}`,
			(result) => {
				setUser(current => ({ ...current, quotes: current.quotes.filter(quote => quote._id !== event.target.dataset.id)}));
				setSelected(null);
			},
			(error) => setError(error),
		);
	};

	// Render - If no quote is selected display message instead of list
	if (!quote?._id) {
		return (
		<div className="quote-view">
			<p className="quote-view__empty">No Quote Selected</p>
		</div>
		);
	}

	// Render - Display details of selected quote
	return (
		<section className="quote-view">
			<header className="quote-view__header">
				<h2 className="quote-view__name">Quote: {quote?.name || ""}</h2>
				<p className="quote-view__total">Total: £{total.toFixed(2)}</p>
			</header>
			<div className="quote-view__tasks">
				{quote?.tasks && quote.tasks.map((task, index) => <TaskView key={(task.name || "") + index} task={task} index={index} newQuote={false} />)}
				{(!quote?.tasks || quote?.tasks?.length === 0) && <p className="quote-view__tasks-empty">No Tasks</p>}
			</div>
			<div className="quote-view__buttons">
				{!editSelected && <button className="quote-view__button" onClick={editQuote}>Edit Quote</button>}
				{editSelected && <button className="quote-view__button" onClick={cancelEditQuote}>Cancel Edit Quote</button>}
				<button className="quote-view__button" onClick={deleteQuote} data-id={quote?._id}>Delete Quote</button>
			</div>
			{error && <Error error={error} resetError={resetError} />}
		</section>
	);
};

export default QuoteView;
