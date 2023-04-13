import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV?.trim();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PUBLIC_PATH = `${__dirname}/client/build`;

export const SERVER_PORT = process.env.SERVER_PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;

export const MONGO_DB_NAME = (NODE_ENV === "development") ? `${process.env.MONGO_DB_NAME}-testing` : process.env.MONGO_DB_NAME;
export const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster1.oaorkkq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
// export const MONGO_URI = `mongodb://127.0.0.1:27017/${MONGO_DB_NAME}`;
