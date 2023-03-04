import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PUBLIC_PATH = process.env.PUBLIC_PATH || `${__dirname}/public`;
export const PORT = process.env.PORT || 2000;
