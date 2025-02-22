import path from "path";
import { fileURLToPath } from "url";

export function template_path() {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "resources", "templates");
}