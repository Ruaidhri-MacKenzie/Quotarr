import { useState, useEffect } from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";
import "./App.css";

const App = () => {
	const [user, setUser] = useState({
		_id: null,
		username: "",
		admin: false,
		quotes: [],
	});
	const [accessToken, setAccessToken] = useState(null);

	useEffect(() => {
		fetch("http://localhost:2000/auth")
		.then(response => response.json())
		.then(result => {
			if (result.error) {
				console.log(result.error);
			}
			else {
				setUser(result.user);
				setAccessToken(result.accessToken);
			}
		});
	}, []);
	
	const renderMainView = () => {
		return accessToken
			? <Home user={user} />
			: <Auth setUser={setUser} setAccessToken={setAccessToken} />;
	};

	return (
    <div className="App">
			<Header title="Quotarr" />
			<main className="main">
				{renderMainView()}
			</main>
			<Footer author="Ruaidhri MacKenzie" year="2023" />
    </div>
  );
};

export default App;
