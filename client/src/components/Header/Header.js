import React from "react";
import "./Header.css";

const Header = ({ title, signOut }) => {
	return (
		<header className="header">
			<h1 className="header__title">{title}</h1>
			<button className="header__sign-out" onClick={signOut}>Sign Out</button>
		</header>
	);
};

export default Header;
