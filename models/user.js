import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	admin: { type: Boolean, default: false },
	quotes: [{ type : mongoose.Schema.Types.ObjectId, ref: "Quote" }],
	createTime: { type: Date, default: Date.now, immutable: true },
});

export default mongoose.model("User", UserSchema);
