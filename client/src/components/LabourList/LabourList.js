import "./LabourList.css";

const LabourLine = ({ line }) => {
	return (
		<li className="labour-line">
			<p className="labour-line__column">{line.role}</p>
			<p className="labour-line__column">{line.hours}</p>
		</li>
	);
};

const LabourList = ({ labour }) => {
	const columns = ["Role", "Hours"];

	return (
		<ul className="labour-list">
			<li className="labour-list__header">
				{columns.map(column => <p key={column} className="labour-list__column">{column}</p>)}
			</li>
			{labour.map((line, index) => <LabourLine key={(line.role || "") + index} line={line} />)}
			{labour.length === 0 && <li className="labour-list__empty">No labour</li>}
		</ul>
	);
};

export default LabourList;
