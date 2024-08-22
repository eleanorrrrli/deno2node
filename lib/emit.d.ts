import type { Diagnostic, Project } from "./deps.node.js";
/**
 * Emits project to the filesystem.
 * Returns diagnostics.
 *
 * Replaces Deno shebang with Node.js shebang in JS outputs.
 * Removes shebangs from non-JS outputs.
 * Then `chmod +x`'s outputs with Node.js shebang.
 */
export declare function emit(project: Project): Promise<Diagnostic[]>;
