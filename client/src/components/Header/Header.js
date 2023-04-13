import React from "react";
import "./Header.css";

const Header = ({ title, user, showAdmin, setShowAdmin, signOut }) => {
	const toggleShowAdmin = (event) => setShowAdmin(current => !current);

	return (
		<header className="header">
			<h1 className="header__title">{title}</h1>
			{user && <h2 className="header__username">{user.username}</h2>}
			{user?.admin && <button className="header__admin" onClick={toggleShowAdmin}>{showAdmin ? "Home" : "Admin"}</button>}
			{user && <button className="header__sign-out" onClick={signOut}>Sign Out</button>}
		</header>
	);
};

export default Header;
