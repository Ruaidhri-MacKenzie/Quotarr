import { useState } from "react";
import ItemsList from "../ItemsList/ItemsList.js";
import "./ItemsInput.css";

const ItemsInput = ({ items, setItems }) => {
	const initialState = { name: "", cost: 0, quantity: 1 };
	const [state, setState] = useState(initialState);

	const handleInputChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const name = state.name;
		const cost = Number(state.cost);
		const quantity = Number(state.quantity);

		setItems(current => [...current, { name, cost, quantity }]);
		setState(initialState);
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
					<input className="items-input__cost-input" type="number" step={0.01} min={0} max={99999.99} name="cost" value={state.cost || 0} onChange={handleInputChange} />
				</label>

				<label className="items-input__quantity">
					<p className="items-input__quantity-label">Quantity</p>
					<input className="items-input__quantity-input" type="number" min={1} name="quantity" value={state.quantity || 0} onChange={handleInputChange} />
				</label>

				<button className="items-input__submit" type="submit" onClick={handleSubmit} disabled={!state.name || !state.cost || state.cost < 0 || !state.quantity || state.quantity <= 0}>Add Line</button>
			</div>
		</div>
	);
};

export default ItemsInput;
