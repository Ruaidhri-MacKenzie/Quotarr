import { useState, useEffect } from "react";
import TaskInput from "../TaskInput/TaskInput.js";
import TaskView from "../TaskView/TaskView.js";
import Error from "../Error/Error.js";
import { httpPost, httpPut } from "../../utils/http.js";
import "./QuoteForm.css";

const QuoteForm = ({ quote, edit, setEdit, roles, setUser, setSelected, admin }) => {
	const [name, setName] = useState("");
	const [tasks, setTasks] = useState([]);
	const [showNewTask, setShowNewTask] = useState(false);
	const [error, setError] = useState("");
	const resetError = () => setError("");

	const title = admin
		? edit ? "Edit Exact Quote" : "New Exact Quote"
		: edit ? "Edit Quote" : "New Quote";

	useEffect(() => {
		if (edit && quote) {
			setName(quote.name);
			setTasks(quote.tasks);
		}
		else {
			setName("");
			setTasks([]);
		}
	}, [edit, quote]);

	const handleChangeName = (event) => setName(event.target.value);

	const handleSuccess = (result) => {
		setName("");
		setTasks([]);
		setShowNewTask(false);
		if (quote) setUser(current => ({ ...current, quotes: current.quotes.filter(q => q._id !== quote._id)}));
		setUser(current => ({ ...current, quotes: [...current.quotes, result.quote] }));
		setSelected(result.quote);
		if (edit) setEdit(false);
	};
	
	const handleError = (error) => console.log(error);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (quote) {
			httpPut(`/quotes/${quote._id}`, { name, tasks }, handleSuccess, handleError);
		}
		else {
			if (admin) {
				httpPost("/quotes/raw", { name, tasks }, handleSuccess, handleError);
			}
			else {
				httpPost("/quotes", { name, tasks }, handleSuccess, handleError);
			}
		}
	};

	const removeTask = (event) => {
		event.preventDefault();
		setTasks(current => current.filter((task, index) => Number(event.target.dataset.index) !== index));
	};

	return (
		<form className="quote-form" onSubmit={handleSubmit}>
			<h2 className="quote-form__title">{title}</h2>
			
			<label className="quote-form__name">
				<p className="quote-form__name-label">Quote Name</p>
				<input className="quote-form__name-input" type="text" name="name" value={name || ""} onChange={handleChangeName} />
			</label>

			{tasks.length > 0 && (<ul className="quote-form__tasks">
				{tasks && tasks.map((task, index) => <TaskView key={(task.name || "") + index} task={task} index={index} newQuote={true} removeTask={removeTask} />)}
			</ul>)}

			{showNewTask && <TaskInput roles={roles} setTasks={setTasks} close={(event) => setShowNewTask(false)} />}
			{!showNewTask && <button className="quote-form__new-task" onClick={(event) => setShowNewTask(true)}>New Task</button>}

			{error && <Error error={error} resetError={resetError} />}
			{<button className="quote-form__submit" type="submit" disabled={(showNewTask || !name.length || !tasks.length || tasks.reduce((total, task) => total += task.labour?.length, 0) === 0)}>{(edit && quote) ? "Update Quote" : "Create Quote"}</button>}
		</form>
	);
};

export default QuoteForm;
