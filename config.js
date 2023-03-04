import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PUBLIC_PATH = `${__dirname}/public`;
export const PORT = process.env.PORT || 2000;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASS = process.env.MONGO_PASS;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
export const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster1.oaorkkq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
