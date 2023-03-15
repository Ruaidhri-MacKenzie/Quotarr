import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	name: { type: String, required: true },
	tasks: [{
		name: { type: String, default: "" },
		labourCost: { type: Number, default: 0 },
		labour: [{
			role: { type: String, default: "" },
			hours: { type: Number, default: 1, min: 1 },
		}],
		items: [{
			name: { type: String, default: "" },
			cost: { type: Number, default: 0, min: 0 },
			quantity: { type: Number, default: 1, min: 1 },
		}],
	}],
	createdAt: { type: Date, default: Date.now, immutable: true },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quote", QuoteSchema);
