import { useState } from "react";
import LabourList from "../LabourList/LabourList.js";
import "./LabourInput.css";

const LabourInput = ({ labour, setLabour, roles }) => {
	const initialState = { role: "", hours: 1 };
	const [state, setState] = useState(initialState);

	const handleInputChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const role = state.role;
		const hours = Number(state.hours);
		setLabour(current => [...current, { role, hours }]);
		setState(initialState);
	};

	return (
		<div className="labour-input">
			<h4 className="labour-input__title">Labour</h4>

			<LabourList labour={labour} />

			<div className="labour-input__form">
				<label className="labour-input__role">
					<p className="labour-input__role-label">Role</p>
					<select className="labour-input__role-input" name="role" value={state.role || ""} onChange={handleInputChange}>
						<option value="" disabled>Select a role</option>
						{roles.map(role => <option key={role.name} value={role.name}>{role.name}</option>)}
						{roles.length === 0 && <option value="Intern">Intern</option>}
					</select>
				</label>

				<label className="labour-input__hours">
					<p className="labour-input__hours-label">Hours</p>
					<input className="labour-input__hours-input" type="number" min={1} name="hours" value={state.hours || 0} onChange={handleInputChange} />
				</label>

				<button className="labour-input__submit" type="submit" onClick={handleSubmit} disabled={!state.role || !state.hours || state.hours <= 0}>Add Line</button>
			</div>
		</div>
	);
};

export default LabourInput;
