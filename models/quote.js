import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	tasks: [{ type : mongoose.Schema.Types.ObjectId, ref: "Task" }],
	fudgeFactor: { type: Number, default: 1.1 },
	createTime: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", QuoteSchema);
