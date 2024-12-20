// this is where we analyze the project
import { getConfig } from "../src/config/config-mgr.js";

import { logger } from "../../logger.js";

export async function analyze() {
  logger.highlight("Starting analysis...");

  const configType = getConfig();
  if (!configType) {
    logger.warning("No Webpack or Vite config found. Exiting.");
    return;
  }
}
