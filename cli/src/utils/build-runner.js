import { spawn } from "child_process";

export default function runBuildAndMeasure(type) {
  const startMem = process.memoryUsage().heapUsed;
  const startTime = Date.now();

  let buildCmd =
    type === "webpack" ? "npx webpack --mode production" : "npx vite build";

  return new Promise((resolve) => {
    const child = spawn(buildCmd, { shell: true });
    child.on("close", (code) => {
      const endTime = Date.now();
      const buildTime = endTime - startTime;
      const endMem = process.memoryUsage().heapUsed;
      const memoryUsage = ((endMem - startMem) / (1024 * 1024)).toFixed(2);

      // here we mock the result by parsing the webpack stats || vite build output
      const bundleSizes = {
        "main.js": 150000, // bytes
        "vendor.js": 300000,
      };

      resolve({ buildTime, bundleSizes, memoryUsage });
    });
  });
}
