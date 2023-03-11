import { useState, useEffect } from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Auth from "./pages/Auth/Auth.js";
import Home from "./pages/Home/Home.js";
import { httpGet } from "./utils/http.js";
import "./App.css";

const App = () => {
	const [user, setUser] = useState(null);

	const signOut = () => {
		httpGet("http://localhost:2000/auth/signout",
			(result) => setUser(null),
			(error) => console.log(error),
		);
	};

	useEffect(() => {
		httpGet("http://localhost:2000/auth", 
			(result) => setUser(result.user),
			(error) => console.log(error),
		);
	}, []);

	return (
    <div className="App">
			<Header title="Quotarr" admin={user?.admin} signOut={signOut} />
			<main className="main">
				{!user && <Auth setUser={setUser} />}
				{user && <Home user={user} setUser={setUser} />}
			</main>
			<Footer author="Ruaidhri MacKenzie" year="2023" />
    </div>
  );
};

export default App;
