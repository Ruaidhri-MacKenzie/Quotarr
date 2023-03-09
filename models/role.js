import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	name: { type: String, required: true, unique: true },
	rate: { type: Number, default: 0, min: 0 },
	timeCreated: { type: Date, default: Date.now, immutable: true },
});

export default mongoose.model("Role", RoleSchema);
