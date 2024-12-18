import { cosmiconfigSync } from "cosmiconfig";
import schema from "./schema.json" assert { type: "json" };
import { logger } from "../../logger.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const betterAjvErrors = require("better-ajv-errors").default;
const Ajv = require("ajv").default;
const ajv = new Ajv();

const configLoader = cosmiconfigSync("cli");

export function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning("Could not find configuration, using default");
    return { port: 1234 };
  } else {
    // config avj schema validator library orqali validate qilamiz
    // va keyin valid bo'lsa korsatamiz
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning("Invalid configuration was supplied");
      console.log();
      // errorlarni user friendly qilamiz.
      const log = betterAjvErrors(schema, result.config, ajv.errors, {
        format: "cli",
      });
      console.log(log);
      process.exit(1); // (1) exit qiladi
    }
    logger.debug("Found a configuration", result.config);
    return result.config;
  }
}
