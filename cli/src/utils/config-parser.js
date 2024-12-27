import fs from "fs";

export function detectConfig() {
  if (fs.existsSync("webpack.config.js")) return "webpack";
  if (fs.existsSync("vite.config.js")) return "vite";
  return null;
}

export async function parseConfig(type) {
  //   let configFile = type === "webpack" ? "webpack.config.js" : "vite.config.js";
  //   const config = await import(`${process.cwd()}/${configFile}`);
  //   return config.default || config;
  try {
    const configFile =
      type === "webpack" ? "webpack.config.js" : "vite.config.js";
    const configModule = await import(`${process.cwd()}/${configFile}`);
    return configModule.default || configModule;
  } catch (err) {
    console.error("Error importing config file:", err);
    throw err;
  }
}
