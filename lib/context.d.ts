import { type Config } from "./config.js";
import { Project, ts } from "./deps.node.js";
export interface Options {
    readonly tsConfigFilePath?: string;
    readonly compilerOptions?: ts.CompilerOptions;
    readonly skipAddingFilesFromTsConfig?: boolean;
}
export declare class Context {
    baseDir: string;
    config: Config;
    readonly project: Project;
    /**
     * Synchronously loads `tsconfig.json` and `"files"`.
     */
    constructor(options: Options);
    resolve(...pathSegments: string[]): string;
}
