/**
 * subprocess_simple.ts
 */
const netPermissionStatus = await Deno.permissions.query({ name: "net" });
const readPermissionStatus = await Deno.permissions.query({ name: "read" });
const writePermissionStatus = await Deno.permissions.query({ name: "write" });
const envPermissionStatus = await Deno.permissions.query({ name: "env" });
const ffiPermissionStatus = await Deno.permissions.query({ name: "ffi" });
// if (netPermissionStatus.state === "granted") {
//   // Use the network resource
// } else {
//   console.error("Network permission is required to continue.");
// }
// Define the command to execute
const command = {
    cmd: ["deno", "run", "--allow-run", "subprocess.ts"],
    stdout: "piped",
    stderr: "piped",
};
// Create subprocess and collect output
const process = Deno.run(command);
// Read the output and error asynchronously
const [stdout, stderr] = await Promise.all([
    process.output(),
    process.stderrOutput(),
]);
// // Decode and log the output
// if (stdout) {
//   console.log(new TextDecoder().decode(stdout));
// }
// // Decode and log the error
// if (stderr) {
//   console.error(new TextDecoder().decode(stderr));
// }
// Wait for the process to complete
const status = await process.status();
console.log(`Process exited with status ${status.code}`);
import { Deno } from "./../shim.node.js";
