import { logger } from "../../logger.js";

export function start(config) {
  logger.highlight("Starting the app: ");
  logger.debug("Received configs in the start - ", config);
}
