const juniorRate = 10;
const seniorRate = 20;
const expertRate = 30;

export const calculateRawLabourCost = (task) => {
	const juniorHours = task.juniorHours || 0;
	const seniorHours = task.seniorHours || 0;
	const expertHours = task.expertHours || 0;
	task.labourCost = (juniorHours * juniorRate) + (seniorHours * seniorRate) + (expertHours * expertRate);
	delete task.juniorHours;
	delete task.seniorHours;
	delete task.expertHours;
	return task;
};

export const calculateLabourCost = (task) => {
	const juniorHours = task.juniorHours || 0;
	const seniorHours = task.seniorHours || 0;
	const expertHours = task.expertHours || 0;
	task.labourCost = (juniorHours * juniorRate * (Math.random() + 0.5)) + (seniorHours * seniorRate * (Math.random() + 0.5)) + (expertHours * expertRate * (Math.random() + 0.5));
	delete task.juniorHours;
	delete task.seniorHours;
	delete task.expertHours;
	return task;
};

export const extractQuoteData = (quote) => {
	return {
		_id: quote._id,
		tasks: quote.tasks,
		createTime: quote.createTime,
	};
};
