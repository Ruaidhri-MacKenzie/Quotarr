import { useState } from "react";
import LabourList from "../LabourList/LabourList.js";
import "./LabourInput.css";

const LabourInput = ({ labour, setLabour, roles }) => {
	const [state, setState] = useState({});

	const handleInputChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLabour(current => [...current, {
			role: state.role,
			hours: Number(state.hours) || 0,
		}]);
	};

	return (
		<div className="labour-input">
			<h4 className="labour-input__title">Labour</h4>

			<LabourList labour={labour} />

			<div className="labour-input__form">
				<label className="labour-input__role">
					<p className="labour-input__role-label">Role</p>
					<select className="labour-input__role-input" name="role" value={state.role} defaultValue="" onChange={handleInputChange}>
						<option value="" disabled>Select a role</option>
						{roles.map(role => <option key={role.name} value={role.name}>{role.name}</option>)}
						{roles.length === 0 && <option value="Intern">Intern</option>}
					</select>
				</label>

				<label className="labour-input__hours">
					<p className="labour-input__hours-label">Hours</p>
					<input className="labour-input__hours-input" type="number" name="hours" value={state.hours || 0} onChange={handleInputChange} />
				</label>

				<button className="labour-input__submit" type="submit" onClick={handleSubmit}>Add Line</button>
			</div>
		</div>
	);
};

export default LabourInput;
