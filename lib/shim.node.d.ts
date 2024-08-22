export { Deno } from "@deno/shim-deno";
export { alert, confirm, prompt } from "@deno/shim-prompts";
export { webcrypto as crypto } from "node:crypto";
export declare function fetch(fileUrl: URL): Promise<{
    json: () => any;
    text: () => string;
}>;
