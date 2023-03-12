import React from "react";
import "./Header.css";

const Header = ({ title, admin, showAdmin, setShowAdmin, signOut }) => {
	const handleClickAdmin = (event) => setShowAdmin(current => !current);

	return (
		<header className="header">
			<h1 className="header__title">{title}</h1>
			{admin && <button className="header__admin" onClick={handleClickAdmin}>{showAdmin ? "Home" : "Admin"}</button>}
			<button className="header__sign-out" onClick={signOut}>Sign Out</button>
		</header>
	);
};

export default Header;
