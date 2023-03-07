import React from "react";
import "./Footer.css";

const Footer = ({ author, year }) => {
	return (
		<footer className="footer">
			<p className="footer__copyright">{author} &copy; {year}</p>
		</footer>
	);
};

export default Footer;
