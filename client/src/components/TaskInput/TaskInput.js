import { useState } from "react";
import LabourInput from "../LabourInput/LabourInput.js";
import ItemsInput from "../ItemsInput/ItemsInput.js";
import "./TaskInput.css";

const TaskInput = ({ roles, setTasks, close }) => {
	const [name, setName] = useState("");
	const [labour, setLabour] = useState([]);
	const [items, setItems] = useState([]);

	const handleChangeName = (event) => {
		setName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setTasks(current => [...current, {
			name,
			labour,
			items,
		}]);
		setName("");
		setLabour([]);
		setItems([]);
		close();
	};

	return (
		<div className="task-input">
			<header className="task-input__header">
				<h3 className="task-input__title">New Task</h3>
				<button className="task-input__close" onClick={close}>&times;</button>
			</header>

			<label className="task-input__name">
				<p className="task-input__name-label">Task Name</p>
				<input className="task-input__name-input" type="text" value={name || ""} onChange={handleChangeName} />
			</label>

			<LabourInput labour={labour} setLabour={setLabour} roles={roles} />

			<ItemsInput items={items} setItems={setItems} />

			<button className="task-input__submit" type="submit" onClick={handleSubmit}>Add Task</button>
		</div>
	);
};

export default TaskInput;
