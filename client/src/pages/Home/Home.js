import { useState } from "react";
import QuoteList from "../../components/QuoteList/QuoteList.js";
import QuoteView from "../../components/QuoteView/QuoteView.js";
import "./Home.css";

const Home = ({ user }) => {
	const [selectedQuote, setSelectedQuote] = useState(null);

	return (
		<div className="home">
			<h2 className="home__title">Home</h2>
			<QuoteList quotes={user.quotes} setSelected={setSelectedQuote} />
			<QuoteView quote={selectedQuote} />
		</div>
	);
};

export default Home;
