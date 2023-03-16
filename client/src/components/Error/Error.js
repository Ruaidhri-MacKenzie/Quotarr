import "./Error.css";

const Error = ({ error, resetError }) => {
	return (
		<div className="error" onClick={resetError}>
			<p className="error__message">{error}</p>
		</div>
	);
};

export default Error;
