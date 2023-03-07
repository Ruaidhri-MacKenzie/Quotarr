import "./QuoteView.css";

const QuoteView = ({ quote }) => {
	return (
		<div className="quote-view">
			{quote && <p className="quote-view__name">{quote.name}</p>}
			{!quote && <p className="quote-view__empty">No Quote</p>}
		</div>
	);
};

export default QuoteView;
