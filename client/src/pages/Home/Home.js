import { useState, useEffect } from "react";
import QuoteList from "../../components/QuoteList/QuoteList.js";
import QuoteView from "../../components/QuoteView/QuoteView.js";
import QuoteForm from "../../components/QuoteForm/QuoteForm.js";
import QuoteCombine from "../../components/QuoteCombine/QuoteCombine.js";
import RoleInput from "../../components/RoleInput/RoleInput.js";
import { httpGet } from "../../utils/http.js";
import "./Home.css";

const Home = ({ user, setUser, showAdmin }) => {
	const [selectedQuote, setSelectedQuote] = useState(null);
	const [editSelected, setEditSelected] = useState(false);
	const [roles, setRoles] = useState([]);
	
	useEffect(() => {
		httpGet("/roles",
			(result) => setRoles(result.roles),
			(error) => console.log(error),
		);
	}, []);

	return (
		<main className="home">
			<h2 className="home__title">{showAdmin ? "Admin" : "Home"}</h2>
			<QuoteList quotes={user.quotes} selected={selectedQuote} setSelected={setSelectedQuote} />
			<QuoteView quote={selectedQuote} setUser={setUser} setSelected={setSelectedQuote} editSelected={editSelected} setEditSelected={setEditSelected} />
			<QuoteForm quote={selectedQuote} edit={editSelected} setEdit={setEditSelected} roles={roles} setUser={setUser} setSelected={setSelectedQuote} admin={showAdmin} />
			<QuoteCombine quotes={user.quotes} setUser={setUser} setSelected={setSelectedQuote} admin={showAdmin} />
			{showAdmin && <RoleInput roles={roles} setRoles={setRoles} />}
		</main>
	);
};

export default Home;
