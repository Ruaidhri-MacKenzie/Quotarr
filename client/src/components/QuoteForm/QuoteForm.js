import { useState } from "react";
import TaskInput from "../TaskInput/TaskInput.js";
import TaskView from "../TaskView/TaskView.js";
import { httpPost } from "../../utils/http";
import "./QuoteForm.css";

const QuoteForm = ({ onSuccess }) => {
	const [name, setName] = useState("");
	const [tasks, setTasks] = useState([]);
	const [showNewTask, setShowNewTask] = useState(false);

	const onError = (error) => console.log(error);
	const handleChangeName = (event) => setName(event.target.value);

	const handleSubmit = (event) => {
		event.preventDefault();
		httpPost("http://localhost:2000/quotes", { name, tasks }, onSuccess, onError);
	};

	return (
		<form className="quote-form" onSubmit={handleSubmit}>
			<h2 className="quote-form__title">New Quote</h2>
			
			<label className="quote-form__name">
				<p className="quote-form__name-label">Quote Name</p>
				<input className="quote-form__name-input" type="text" name="name" value={name || ""} onChange={handleChangeName} />
			</label>

			<ul className="quote-form__tasks">
				{tasks && tasks.map((task, index) => <TaskView key={(task.name || "") + index} task={task} index={index} />)}
			</ul>

			{showNewTask && <TaskInput setTasks={setTasks} close={(event) => setShowNewTask(false)} />}
			{!showNewTask && <button className="quote-form__new-task" onClick={(event) => setShowNewTask(true)}>New Task</button>}

			<button className="quote-form__submit" type="submit">Create Quote</button>
		</form>
	);
};

export default QuoteForm;
