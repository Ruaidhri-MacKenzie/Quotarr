import "./QuoteList.css";

const QuoteItem = ({ quote, setSelected }) => {
	const handleClick = (event) => {
		setSelected(quote);
	};

	return (
		<li className="quote-list-item" onClick={handleClick}>
			<p className="quote-list-item__name">{quote.name}</p>
		</li>
	);
};

const QuoteList = ({ quotes, setSelected }) => {
	return (
		<ul className="quote-list">
			{quotes && quotes.map((quote, index) => <QuoteItem key={quote.name + index} quote={quote} setSelected={setSelected} />)}
			{(!quotes || !quotes.length) && <p className="quote-list__empty">No Quotes</p>}
		</ul>
	);
};

export default QuoteList;
