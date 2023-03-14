import LabourList from "../LabourList/LabourList";
import ItemsList from "../ItemsList/ItemsList";
import "./TaskView.css";

const TaskView = ({ task, index, newQuote, removeTask }) => {
	const total = (!newQuote) ? task.labourCost + task.items.reduce((acc, cur) => acc += (cur.cost * cur.quantity), 0) : 0;

	return (
		<details className="task-view" open={true}>
			<summary className="task-view__header">
				<h3 className="task-view__name">Task {index + 1}: {task.name}</h3>
				{newQuote && <button className="task-view__remove" data-index={index} onClick={removeTask}>&times;</button>}
				{!newQuote && <p className="task-view__subtotal">Subtotal: £{total.toFixed(2)}</p>}
			</summary>
			<LabourList labour={task.labour} />
			{!newQuote && (
				<div className="task-view__labour">
					<p className="task-view__labour-label">Labour</p>
					<p className="task-view__labour-cost">£{task.labourCost.toFixed(2)}</p>
				</div>
			)}
			<ItemsList items={task.items} />
		</details>
	);
};

export default TaskView;
