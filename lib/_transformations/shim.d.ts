import type { Context } from "../context.js";
import type { SourceFile } from "../deps.node.js";
export declare const shimFile: (shimFile: SourceFile) => (sourceFile: SourceFile) => void;
export declare function shimEverything(ctx: Context): void;
