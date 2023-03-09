import { useState } from "react";
import TaskInput from "../TaskInput/TaskInput.js";
import { httpPost } from "../../utils/http";
import "./QuoteForm.css";

const QuoteForm = ({ onSuccess }) => {
	const [name, setName] = useState("");
	const [tasks, setTasks] = useState([]);
	const [showAddTask, setShowAddTask] = useState(false);

	const onError = (error) => console.log(error);
	const handleChangeName = (event) => setName(event.target.value);

	const handleSubmit = () => {
		httpPost("http://localhost:2000/quote", { name, tasks }, onSuccess, onError);
	};

	return (
		<form className="quote-form" onSubmit={handleSubmit}>
			<h2 className="quote-form__title">New Quote</h2>
			
			<label className="quote-form__name">
				<p className="quote-form__name-label">Quote Name</p>
				<input className="quote-form__name-input" type="text" name="name" value={name || ""} onChange={handleChangeName} />
			</label>

			<ul className="quote-form__tasks">
				{tasks && tasks.map((task, index) => <li key={task.name + index}>{task.name}</li>)}
			</ul>

			{showAddTask && <TaskInput setTasks={setTasks} close={(event) => setShowAddTask(false)} />}
			{!showAddTask && <button className="quote-form__add-task" onClick={(event) => setShowAddTask(true)}>Add Task</button>}

			<button className="quote-form__submit" type="submit">Submit</button>
		</form>
	);
};

export default QuoteForm;
