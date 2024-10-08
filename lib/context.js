import * as path from "node:path";
import { parse } from "./config.js";
import { Project, ts } from "./deps.node.js";
const compilerOptions = {
    // footguns
    removeComments: false,
    // Deno defaults
    strict: true,
    useDefineForClassFields: true,
};
export class Context {
    baseDir;
    config;
    project;
    /**
     * Synchronously loads `tsconfig.json` and `"files"`.
     */
    constructor(options) {
        const { tsConfigFilePath } = options;
        this.project = new Project({
            compilerOptions,
            ...options,
        });
        const fs = this.project.getFileSystem();
        if (tsConfigFilePath === undefined) {
            this.baseDir = fs.getCurrentDirectory();
            this.config = {};
            return;
        }
        const result = ts.readConfigFile(tsConfigFilePath, fs.readFileSync);
        this.baseDir = path.resolve(tsConfigFilePath, "../");
        this.config = parse(result.config.deno2node ?? {});
    }
    resolve(...pathSegments) {
        return path.join(this.baseDir, ...pathSegments);
    }
}
