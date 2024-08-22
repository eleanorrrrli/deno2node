import type { Context } from "../context.js";
import { SourceFile } from "../deps.node.js";
/**
 * Rewrites specifiers in `sourceFile` to point into  the specified `vendorDir`.
 * @param vendorDir - absolute path
 */
export declare const vendorSpecifiers: (vendorDir: string) => (sourceFile: SourceFile) => void;
export declare function vendorEverything(ctx: Context): void;
