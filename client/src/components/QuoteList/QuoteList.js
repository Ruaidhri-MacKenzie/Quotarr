import "./QuoteList.css";

const QuoteItem = ({ quote, index, selected, setSelected }) => {
	const selectQuote = (event) => {
		setSelected(current => (current?._id === quote._id) ? null : quote);
	};
	
	return (
		<li className={"quote-list-item" + ((selected?.name === quote.name) ? " quote-list-item--selected" : "")} tabIndex="0" onClick={selectQuote}>
			Quote {index + 1}: {quote.name}
		</li>
	);
};

const QuoteList = ({ quotes, selected, setSelected }) => {
	return (
		<ul className="quote-list">
			{quotes && quotes.map((quote, index) => <QuoteItem key={(quote.name || "") + index} quote={quote} index={index} selected={selected} setSelected={setSelected} />)}
			{(!quotes || !quotes.length) && <li className="quote-list__empty">No Quotes</li>}
		</ul>
	);
};

export default QuoteList;
