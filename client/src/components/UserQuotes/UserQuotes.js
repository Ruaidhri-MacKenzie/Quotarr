import QuoteList from "../QuoteList/QuoteList";
import "./UserQuotes.css";

const UserQuotes = ({ quotes, selected, setSelected }) => {
	return (
		<section className="user-quotes">
			<h2 className="user-quotes__title">Your Quote List</h2>
			<QuoteList quotes={quotes} selected={selected} setSelected={setSelected} />
		</section>
	);
};

export default UserQuotes;
