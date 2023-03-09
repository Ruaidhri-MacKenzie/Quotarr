import { useState } from "react";
import ItemsList from "../ItemsList/ItemsList.js";
import "./ItemsInput.css";

const ItemsInput = ({ items, setItems }) => {
	const [state, setState] = useState({});

	const handleInputChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setItems(current => [...current, {
			name: state.name,
			cost: Number(state.cost),
			quantity: Number(state.quantity),
		}]);
		setState({});
	};

	return (
		<div className="items-input">
			<h4 className="items-input__title">Items</h4>

			<ItemsList items={items} />

			<div className="items-input__form">
				<label className="items-input__name">
					<p className="items-input__name-label">Item Name</p>
					<input className="items-input__name-input" type="text" name="name" value={state.name || ""} onChange={handleInputChange} />
				</label>

				<label className="items-input__cost">
					<p className="items-input__cost-label">Cost</p>
					<input className="items-input__cost-input" type="number" step={0.01} max={99999.99} name="cost" value={state.cost || 0} onChange={handleInputChange} />
				</label>

				<label className="items-input__quantity">
					<p className="items-input__quantity-label">Quantity</p>
					<input className="items-input__quantity-input" type="number" name="quantity" value={state.quantity || 0} onChange={handleInputChange} />
				</label>

				<button className="items-input__submit" type="submit" onClick={handleSubmit}>Add Line</button>
			</div>
		</div>
	);
};

export default ItemsInput;
