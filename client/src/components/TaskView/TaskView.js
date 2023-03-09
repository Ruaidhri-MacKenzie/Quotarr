import LabourList from "../LabourList/LabourList";
import ItemsList from "../ItemsList/ItemsList";
import "./TaskView.css";

const TaskView = ({ task, index }) => {
	return (
		<div className="task-view">
			<header className="task-view__header">
				<h3 className="task-view__name">Task {index + 1}: {task.name}</h3>
				<button className="task-view__remove">&times;</button>
			</header>
			<LabourList labour={task.labour} />
			<ItemsList items={task.items} />
		</div>
	);
};

export default TaskView;
