import "./QuoteList.css";

const QuoteList = ({ quotes }) => {
	return (
		<ul className="quote-list">
			{quotes.map((quote, index) => <li className="quote-list__item" key={quote.name + index}>Quote {index + 1}: {quote.name}</li>)}
		</ul>
	);
};

export default QuoteList;
