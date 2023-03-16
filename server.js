import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import connectSession from "connect-mongodb-session";
import passport from "passport";
import cors from "cors";

import { localStrategy, serializeUser, deserializeUser } from "./middleware/passport.js";

import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import quoteRouter from "./routes/quote.router.js";
import roleRouter from "./routes/role.router.js";
import { PUBLIC_PATH, PORT, NODE_ENV, SESSION_SECRET, MONGO_URI, MONGO_DB_NAME } from "./config.js";

// Log whether the app is running in development or production environment
console.log(`Environment: ${NODE_ENV}`);

// Create express app with HTTP server
const app = express();

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make cookies sent in the request available as req.cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Set CORS policy
const corsOptions = {};
if (NODE_ENV === "development") {
	corsOptions.origin = "http://127.0.0.1:3000";
	corsOptions.credentials = true;
}
app.use(cors(corsOptions));

// Create user sessions store
const MongoDBStore = connectSession(expressSession);
const store = new MongoDBStore({
  uri: MONGO_URI,
	databaseName: MONGO_DB_NAME,
	collection: "sessions",
});
store.on("error", error => console.log(error));

// Set session cookie options
const cookie = { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 };
if (NODE_ENV === "development") {
	cookie.secure = false;
	cookie.sameSite = "none";
}

// Create user sessions
const session = expressSession({
	name: "sessionId",
	secret: SESSION_SECRET,
	store,
	resave: false,
	saveUninitialized: false,
	cookie,
});
app.use(session);

// Authentication Strategy
passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);
app.use("/roles", roleRouter);
app.use((req, res) => res.status(404).json({ error: "Unknown resource" }));

// Connect to database
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
.then(() => {
	mongoose.connection.on("error", error => console.log(error));
	console.log(`Database connected: ${MONGO_DB_NAME}`);
	
	// Start server listening for requests
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
})
.catch(error => {
	console.log(error);
});
