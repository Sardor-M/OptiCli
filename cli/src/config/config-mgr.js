import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import schema from './schema.json' assert { type: "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Ajv = require("ajv").default;
const ajv = new Ajv();
const configLoader = cosmiconfigSync("cli");

export function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  } else {
    // config avj schema validator library orqali validate qilamiz
    // va keyin valid bo'lsa korsatamiz
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      console.log(chalk.yellow("Invalid configuration was supplied"));
      console.log(ajv.errors);
      process.exit(1); // (1) exit qiladi
    }
    console.log("Found a configuration", result.config);
    return result.config;
  }
}
