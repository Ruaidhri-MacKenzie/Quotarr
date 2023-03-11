import { useState, useEffect } from "react";
import TaskView from "../TaskView/TaskView";
import "./QuoteView.css";

const QuoteView = ({ quote }) => {
	const [total, setTotal] = useState(0);
	
	useEffect(() => {
		if (quote.tasks) {
			setTotal(quote.tasks.reduce((total, task) => {
				return total += task.labourCost + task.items.reduce((subtotal, line) => {
					return subtotal += (line.cost * line.quantity);
				}, 0);
			}, 0));
		}
	}, [quote]);

	if (!quote.name) {
		return (
		<div className="quote-view">
			<p className="quote-view__empty">No Quote Selected</p>
		</div>
		);
	}

	return (
		<div className="quote-view">
			<header className="quote-view__header">
				<h2 className="quote-view__name">Quote: {quote?.name || "Quote"}</h2>
				<p className="quote-view__total">Total: £{total.toFixed(2)}</p>
			</header>
			<div className="quote-view__tasks">
				{quote.tasks && quote.tasks.map((task, index) => <TaskView key={(task.name || "") + index} task={task} index={index} newQuote={false} />)}
				{(!quote.tasks || quote.tasks.length === 0) && <p className="quote-view__tasks-empty">No Tasks</p>}
			</div>
		</div>
	);
};

export default QuoteView;
