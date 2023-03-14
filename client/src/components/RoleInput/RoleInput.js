import { useState, useEffect } from "react";
import { httpDelete, httpPost, httpPut } from "../../utils/http";
import "./RoleInput.css";

const RoleItem = ({ role, setRoles, selected, setSelected }) => {
	const handleClick = (event) => {
		setSelected(current => current?._id === role._id ? null : role);
	};

	const handleRemove = (event) => {
		event.stopPropagation();
		const confirmed = window.confirm("You are about to delete a role, is that correct?");
		if (!confirmed) return;

		httpDelete(`/roles/${role._id}`,
			(result) => setRoles(current => current.filter(r => r._id !== role._id)),
			(error) => console.log(error),
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
		setSelectedRole(result.role);
	};

	const handleError = (error) => console.log(error);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (selectedRole) {
			httpPut(`/roles/${selectedRole._id}`, state, handleSuccess, handleError);
		}
		else {
			httpPost("/roles", state, handleSuccess, handleError);
		}
	};

	return (
		<div className="role-input">
			<h2 className="role-input__title">Role Editor</h2>
			<ul className="role-input__list">
				{roles.map(role => <RoleItem key={role._id} role={role} setRoles={setRoles} selected={selectedRole} setSelected={setSelectedRole} />)}
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
				<button className="role-input__submit" type="submit" disabled={!state.name || !state.rate}>{selectedRole ? "Edit Role" : "Add Role"}</button>
			</form>
		</div>
	);
};

export default RoleInput;
