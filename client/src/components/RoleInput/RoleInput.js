import { useState, useEffect } from "react";
import { httpDelete, httpPost, httpPut } from "../../utils/http.js";
import { sanitiseRole } from "../../utils/sanitise.js";
import Error from "../Error/Error.js";
import "./RoleInput.css";

const RoleItem = ({ role, setRoles, selected, setSelected, handleError }) => {
	const handleClick = (event) => {
		setSelected(current => current?._id === role._id ? null : role);
	};

	const handleRemove = (event) => {
		event.stopPropagation();
		const confirmed = window.confirm("You are about to delete a role, is that correct?");
		if (!confirmed) return;

		httpDelete(`/roles/${role._id}`,
			(result) => setRoles(current => current.filter(r => r._id !== role._id)),
			handleError,
		);
	};

	return (
		<li className={"role-item" + ((selected?._id === role._id) ? " role-item--selected" : "")} tabIndex="0" onClick={handleClick}>
			<p className="role-item__text">{role.name}: £{role.rate.toFixed(2)}</p>
			<button className="role-item__remove" onClick={handleRemove}>&times;</button>
		</li>
	);
};

const RoleInput = ({ roles, setRoles }) => {
	const [state, setState] = useState({});
	const [selectedRole, setSelectedRole] = useState(null);
	const [error, setError] = useState("");
	const handleError = (error) => setError(error);
	const resetError = () => setError("");

	useEffect(() => {
		if (selectedRole) setState({ name: selectedRole.name, rate: selectedRole.rate });
		else setState({});
	}, [selectedRole]);

	const handleChange = (event) => {
		setState(current => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSuccess = (result) => {
		setRoles(current => current.filter(role => role._id !== result.role._id));
		setRoles(current => [...current, result.role]);
		setState({});
		setSelectedRole(null);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const sanitisedState = sanitiseRole(state);
		
		if (selectedRole) {
			httpPut(`/roles/${selectedRole._id}`, sanitisedState, handleSuccess, handleError);
		}
		else {
			httpPost("/roles", sanitisedState, handleSuccess, handleError);
		}
	};

	return (
		<section className="role-input">
			<h2 className="role-input__title">Role Editor</h2>
			<ul className="role-input__list">
				{roles.map(role => <RoleItem key={role._id} role={role} setRoles={setRoles} selected={selectedRole} setSelected={setSelectedRole} handleError={handleError} />)}
				{!roles.length && <li className="role-input__empty">No roles</li>}
			</ul>
			<form className="role-input__form" onSubmit={handleSubmit}>
				<label>
					<p>Name</p>
					<input className="role-input__input" type="text" name="name" value={state.name || ""} onChange={handleChange} />
				</label>
				<label>
					<p>Rate (£ per hour)</p>
					<input className="role-input__input" type="number" step={0.01} min={0} name="rate" value={state.rate || ""} onChange={handleChange} />
				</label>
				{error && <Error error={error} resetError={resetError} />}
				<button className="role-input__submit" type="submit" disabled={!state.name || !state.rate}>{selectedRole ? "Edit Role" : "Add Role"}</button>
			</form>
		</section>
	);
};

export default RoleInput;
