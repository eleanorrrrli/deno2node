// Command for listing files
const lsProcess = Deno.run({
  cmd: ["ls"],
  stdout: "piped",
  stderr: "piped",
});

// Read the output and error asynchronously
const [lsStdout, lsStderr] = await Promise.all([
  lsProcess.output(),
  lsProcess.stderrOutput(),
]);

// Decode and log the output
if (lsStdout) {
  console.log("Files in directory:");
  console.log(new TextDecoder().decode(lsStdout));
}

// Decode and log the error
if (lsStderr) {
  console.error(new TextDecoder().decode(lsStderr));
}

// Wait for the ls process to complete
await lsProcess.status();

// Command for running shell script
const shProcess = Deno.run({
  cmd: ["sh", "install.sh"],
  stdout: "piped",
  stderr: "piped",
});

// Read the output and error asynchronously
const [shStdout, shStderr] = await Promise.all([
  shProcess.output(),
  shProcess.stderrOutput(),
]);

// Decode and log the output
if (shStdout) {
  console.log("Shell script output:");
  console.log(new TextDecoder().decode(shStdout));
}

// Decode and log the error
if (shStderr) {
  console.error(new TextDecoder().decode(shStderr));
}

// Wait for the sh process to complete
const shStatus = await shProcess.status();
console.log(`Shell script process exited with status ${shStatus.code}`);
