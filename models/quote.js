import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	name: { type: String, required: true },
	tasks: [{
		name: { type: String, default: "" },
		labourCost: { type: Number, default: 0 },
		items: [{
			name: { type: String, default: "" },
			cost: { type: Number, default: 0, min: 0 },
			quantity: { type: Number, default: 1, min: 1 },
		}],
	}],
	timeCreated: { type: Date, default: Date.now, immutable: true },
});

export default mongoose.model("Quote", QuoteSchema);
