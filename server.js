import express from "express";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import quoteRouter from "./routes/quote.router.js";
import { PUBLIC_PATH, PORT } from "./config.js";

// Create express app with HTTP server
const app = express();

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Routes
app.get("/", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/quotes", quoteRouter);

// Page not found - standard redirect
app.use((req, res) => res.redirect("/"));

// Start server listening for requests
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
