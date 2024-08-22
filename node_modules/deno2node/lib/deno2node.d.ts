import { Context } from "./context.js";
/**
 * Attempts to transform arbitrary `ctx.project` into a valid Node.js project:
 *
 * 1. Changes import specifiers to be Node-friendly:
 *    - changes extension in relative specifiers to `.js`,
 *    - replaces some `https://` imports with bare specifiers.
 *
 * 2. Changes `*.deno.js` imports specifiers to `*.node.js`
 *    (`import './deps.deno.ts'` -> `import './deps.node.js'`).
 *    This can be used for re-exporting dependencies
 *    and other runtime-specific code.
 *
 * 3. Rewrites remaining https: imports to point
 *    into `vendorDir`, if specified:
 *    ```json
 *    // @filename: tsconfig.json
 *    {
 *      "deno2node": {
 *        "vendorDir": "src/.deno2node/vendor/"
 *      }
 *    }
 *    ```
 *
 * 4. Imports Node.js shims for Deno globals
 *    from [shim file], if specified:
 *    ```json
 *    // @filename: tsconfig.json
 *    {
 *      "deno2node": {
 *        "shim": "src/shim.node.ts"
 *      }
 *    }
 *    ```
 *
 * [shim file]: https://github.com/wojpawlik/deno2node/blob/main/src/shim.node.ts
 */
export declare function deno2node(ctx: Context): Promise<void>;
