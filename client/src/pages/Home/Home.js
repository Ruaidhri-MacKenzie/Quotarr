import { useState, useEffect } from "react";
import QuoteList from "../../components/QuoteList/QuoteList.js";
import QuoteView from "../../components/QuoteView/QuoteView.js";
import QuoteForm from "../../components/QuoteForm/QuoteForm.js";
import { httpGet } from "../../utils/http.js";
import "./Home.css";

const Home = ({ user, setUser }) => {
	const [selectedQuote, setSelectedQuote] = useState(null);
	const [roles, setRoles] = useState([]);
	const [editSelected, setEditSelected] = useState(false);

	useEffect(() => {
		httpGet("/roles",
			(result) => setRoles(result.roles),
			(error) => console.log(error)
		);
	}, []);

	return (
		<div className="home">
			<h2 className="home__title">Home</h2>
			<QuoteList quotes={user.quotes} selected={selectedQuote} setSelected={setSelectedQuote} />
			<QuoteView quote={selectedQuote} setUser={setUser} editSelected={editSelected} setEditSelected={setEditSelected} />
			<QuoteForm quote={selectedQuote} edit={editSelected} roles={roles} setUser={setUser} setSelected={setSelectedQuote}/>
		</div>
	);
};

export default Home;
