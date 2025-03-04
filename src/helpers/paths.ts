import path from "path";
import { fileURLToPath } from "url";

/**
 * возвращает файловый путь до директории с html шаблонами
 * @returns файловый путь до директории с html шаблонами
 */
export function template_path() {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "resources", "templates");
}