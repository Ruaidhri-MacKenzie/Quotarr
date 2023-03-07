import QuoteList from "../../components/QuoteList/QuoteList.js";
import "./Home.css";

const Home = ({ user, accessToken, setAccessToken }) => {
	return (
		<div className="home">
			<h2 className="home__title">Home</h2>
			<QuoteList quotes={user.quotes} />
		</div>
	);
};

export default Home;
