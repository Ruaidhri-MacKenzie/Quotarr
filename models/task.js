import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	juniorHours: { type: Number, default: 0 },
	seniorHours: { type: Number, default: 0 },
	expertHours: { type: Number, default: 0 },
	items: [{
		name: { type: String },
		cost: { type: Number, default: 0, min: 0 },
		quantity: { type: Number, default: 1, min: 1 },
	}],
	createTime: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
