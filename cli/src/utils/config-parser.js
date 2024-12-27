import fs, { existsSync } from "fs";

export function detectConfig() {
  if (fs.existsSync("webpack.config.js")) return "webpack";
  if (fs(existsSync("vite.config.js"))) return "vite";
  return null;
}

export async function pareseConfig() {
  let configFile =
    type === "webpack" ? "./webpack.config.js" : "./vite.config.js";
  const config = await import(`${process.cwd()}/${configFile}`);
  return config.default || config;
}
