import "./ItemsList.css";

const ItemsLine = ({ line }) => {
	return (
		<li className="items-line">
			<p className="items-line__column">{line.name}</p>
			<p className="items-line__column">£{line.cost.toFixed(2)}</p>
			<p className="items-line__column">x{line.quantity}</p>
			<p className="items-line__column">£{(line.cost * line.quantity).toFixed(2)}</p>
		</li>
	);
};

const ItemsList = ({ items }) => {
	const columns = ["Item Name", "Cost", "Quantity", "Total"];
	return (
		<ul className="items-list">
			<li className="items-list__header">
				{columns.map(column => <p key={column} className="items-list__column">{column}</p>)}
			</li>
			{items.map((line, index) => <ItemsLine key={line.name + index} line={line} />)}
			{items.length === 0 && <li className="items-list__empty">No items</li>}
		</ul>
	);
};

export default ItemsList;
