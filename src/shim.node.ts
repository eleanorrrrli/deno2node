import { ChildProcess, spawn, SpawnOptions } from "node:child_process";
import { readFile } from "node:fs/promises";

// import { Deno as ShimDeno } from "@deno/shim-deno";
export { Deno } from "@deno/shim-deno";
export { alert, confirm, prompt } from "@deno/shim-prompts";
export { webcrypto as crypto } from "node:crypto";

class Command {
  private name: string;
  private args: string[];
  private options: SpawnOptions;

  constructor(name: string, args: string[] = [], options: SpawnOptions = {}) {
    this.name = name;
    this.args = args;
    this.options = options;
  }

  // Method to start the command
  run(): ChildProcess {
    return spawn(this.name, this.args, this.options);
  }

  spawn(): ChildProcess {
    return this.run();
  }

  // Method to get command output
  async output(): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const child = this.run();
      let stdout = "";
      let stderr = "";

      child.stdout?.on("data", (data) => {
        stdout += data;
      });

      child.stderr?.on("data", (data) => {
        stderr += data;
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });

      child.on("error", (err) => {
        reject(err);
      });
    });
  }

  getName() {
    return this.name;
  }
}

// const Deno = {
//   // ...ShimDeno,
//   args: process.argv.slice(2),
//   build: { os: process.platform === "win32" ? "windows" : process.platform },
//   chmod,
//   exit: process.exit,
//   get noColor() {
//     return Boolean(process.env.NO_COLOR);
//   },
//   stdin: {
//     isTerminal: () => isatty(process.stdin.fd),
//     get readable() {
//       return process.stdin;
//     },
//   },
//   stdout: {
//     isTerminal: () => isatty(process.stdout.fd),
//     writeSync(data: Uint8Array) {
//       process.stdout.write(new TextDecoder().decode(data));
//     },
//   },
//   stderr: {
//     isTerminal: () => isatty(process.stderr.fd),
//   },
//   remove: async (path: string, options?: { recursive?: boolean }) => {
//     await rm(path, { recursive: options?.recursive, force: true });
//   },
//   readTextFile: async (path: string) => {
//     return await readFile(path, { encoding: "utf-8" });
//   },
//   Command,
// };

// export { Deno };

export async function fetch(fileUrl: URL) {
  const data = await readFile(fileUrl, { encoding: "utf-8" });
  return {
    json: () => JSON.parse(data),
    text: () => data,
  };
}
