import LabourList from "../LabourList/LabourList";
import ItemsList from "../ItemsList/ItemsList";
import "./TaskView.css";

const TaskView = ({ task, index, newQuote, removeTask }) => {
	const total = (!newQuote) ? task.labourCost + task.items.reduce((acc, cur) => acc += (cur.cost * cur.quantity), 0) : 0;

	return (
		<div className="task-view">
			<header className="task-view__header">
				<h3 className="task-view__name">Task {index + 1}: {task.name}</h3>
				{newQuote && <button className="task-view__remove" data-index={index} onClick={removeTask}>&times;</button>}
				{!newQuote && <p className="task-view__subtotal">Subtotal: £{total.toFixed(2)}</p>}
			</header>
			{newQuote && <LabourList labour={task.labour} />}
			<ItemsList items={task.items} />
			{!newQuote && (
				<div className="task-view__labour">
					<p className="task-view__labour-label">Labour</p>
					<p className="task-view__labour-cost">£{task.labourCost.toFixed(2)}</p>
				</div>
			)}
		</div>
	);
};

export default TaskView;
