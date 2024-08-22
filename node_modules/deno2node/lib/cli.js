#!/usr/bin/env node
import { ts } from "./deps.node.js";
import { getHelpText } from "./help.js";
import { getVersion, initializeProject } from "./init.js";
import { Context, deno2node, emit } from "./mod.js";
const { options, fileNames, errors } = ts.parseCommandLine(Deno.args);
const tsConfigFilePath = options.project ?? fileNames[0] ?? "tsconfig.json";
if (errors.length) {
    for (const error of errors) {
        console.error(error.messageText);
    }
    Deno.exit(2);
}
if (options.help) {
    console.log(getHelpText(await getVersion()));
    Deno.exit(0);
}
if (options.version) {
    console.log("deno2node", await getVersion());
    console.log("typescript", ts.version);
    Deno.exit(0);
}
if (options.init) {
    await initializeProject();
    Deno.exit(0);
}
console.time("Loading tsconfig");
const ctx = new Context({ tsConfigFilePath, compilerOptions: options });
console.timeEnd("Loading tsconfig");
await deno2node(ctx);
console.time("Emitting");
const diagnostics = await emit(ctx.project);
console.timeEnd("Emitting");
if (diagnostics.length !== 0) {
    console.info(ctx.project.formatDiagnosticsWithColorAndContext(diagnostics));
    console.info("TypeScript", ts.version);
    console.info(`Found ${diagnostics.length} errors.`);
    Deno.exit(1);
}
import { Deno } from "./shim.node.js";
