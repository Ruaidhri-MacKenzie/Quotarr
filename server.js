import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import quoteRouter from "./routes/quote.router.js";
import { PUBLIC_PATH, PORT, MONGO_URI } from "./config.js";

// Create express app with HTTP server
const app = express();

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Routes
app.get("/", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/quotes", quoteRouter);

// Page not found - standard redirect
app.use((req, res) => res.redirect("/"));

// Connect to database
await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// Start server listening for requests
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
