import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	tasks: [{
		juniorHours: { type: Number, default: 0 },
		seniorHours: { type: Number, default: 0 },
		expertHours: { type: Number, default: 0 },
		items: [{
			name: { type: String, default: "" },
			cost: { type: Number, default: 0, min: 0 },
			quantity: { type: Number, default: 1, min: 1 },
		}],
	}],
	fudgeFactor: { type: Number, default: 1.1 },
	createTime: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", QuoteSchema);
