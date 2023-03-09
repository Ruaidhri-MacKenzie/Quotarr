import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PUBLIC_PATH = `${__dirname}/client/build`;

export const PORT = process.env.PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;

export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASS = process.env.MONGO_PASS;
export const MONGO_DB_NAME = (NODE_ENV === "development") ? "testing" : process.env.MONGO_DB_NAME;
export const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster1.oaorkkq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
