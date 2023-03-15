import mongoose from "mongoose";
import * as userService from "../services/user.service.js";

const UserSchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	admin: { type: Boolean, default: false },
	quotes: [{ type : mongoose.Schema.Types.ObjectId, ref: "Quote" }],
	createdAt: { type: Date, default: Date.now, immutable: true },
	updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
	else {
		user.password = await userService.hashPassword(user.password);
		next();
	}
});

export default mongoose.model("User", UserSchema);
