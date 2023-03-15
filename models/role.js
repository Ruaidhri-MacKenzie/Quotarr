import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	name: { type: String, required: true, unique: true },
	rate: { type: Number, default: 0, min: 0 },
	createdAt: { type: Date, default: Date.now, immutable: true },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Role", RoleSchema);
