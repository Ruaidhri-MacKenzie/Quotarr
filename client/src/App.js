import { useState, useEffect } from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";
import { httpGet } from "./utils/http.js";
import "./App.css";

const App = () => {
	const [user, setUser] = useState(null);
	const [showAdmin, setShowAdmin] = useState(null);

	useEffect(() => {
		httpGet("/auth", 
			(result) => setUser(result.user),
			(error) => console.log("Not signed in"),
		);
	}, []);

	const signIn = (result) => setUser(result.user);
	const signOut = () => {
		httpGet("/auth/signout",
			(result) => setUser(null),
			(error) => console.log(error),
		);
	};

	const renderPage = () => {
		if (user) return <Home user={user} setUser={setUser} showAdmin={showAdmin} />;
		else return <Auth signIn={signIn} />;
	};

	return (
    <div className="App">
			<Header title="Quotarr" user={user} showAdmin={showAdmin} setShowAdmin={setShowAdmin} signOut={signOut} />
			{renderPage()}
			<Footer author="Ruaidhri MacKenzie" year="2023" />
    </div>
  );
};

export default App;
