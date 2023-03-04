import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_PATH = `${__dirname}/public`;
const PORT = 2000;

// Create express app with HTTP server
const app = express();

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(PUBLIC_PATH));

// Routes
app.get("/", (req, res) => res.sendFile(`${PUBLIC_PATH}/index.html`));

// Page not found - standard redirect
app.use((req, res) => res.redirect("/"));

// Start server listening for requests
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
