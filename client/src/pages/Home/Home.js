import { useState, useEffect } from "react";
import UserQuotes from "../../components/UserQuotes/UserQuotes.js";
import AdminQuotes from "../../components/AdminQuotes/AdminQuotes.js";
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
	
	const handleSuccess = (result) => setRoles(result.roles);
	const handleError = (error) => console.log(error);
	useEffect(() => {
		httpGet("/roles", handleSuccess, handleError);
	}, []);

	return (
		<main className="home">
			<h2 className="home__title">{showAdmin ? "Admin" : "Home"}</h2>
			{!showAdmin && <UserQuotes quotes={user.quotes} selected={selectedQuote} setSelected={setSelectedQuote} />}
			{showAdmin && <AdminQuotes selected={selectedQuote} setSelected={setSelectedQuote} />}
			<QuoteView quote={selectedQuote} setUser={setUser} setSelected={setSelectedQuote} editSelected={editSelected} setEditSelected={setEditSelected} />
			<QuoteForm quote={selectedQuote} edit={editSelected} setEdit={setEditSelected} roles={roles} setUser={setUser} setSelected={setSelectedQuote} admin={showAdmin} />
			<QuoteCombine quotes={user.quotes} setUser={setUser} setSelected={setSelectedQuote} admin={showAdmin} />
			{showAdmin && <RoleInput roles={roles} setRoles={setRoles} />}
		</main>
	);
};

export default Home;
