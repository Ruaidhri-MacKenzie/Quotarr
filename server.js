import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import quoteRouter from "./routes/quote.router.js";
import paygradeRouter from "./routes/paygrade.router.js";
import { PUBLIC_PATH, PORT, MONGO_URI } from "./config.js";

// Create express app with HTTP server
const app = express();

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make cookies sent in the request available as req.cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Routes
app.get("/", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);
app.use("/paygrades", paygradeRouter);

// Resource not found - 404
app.use((req, res) => res.status(404).json({ error: "Unknown resource" }));

// Connect to database
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
.then(() => {
	mongoose.connection.on("error", error => console.log(error));
	console.log("Database connected.");
	
	// Start server listening for requests
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
})
.catch(error => {
	console.log(error);
});
