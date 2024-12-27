// this is where we run npm audit and we parse the results

import { logger } from "../../logger.js";
import { checkVulnerabilities } from "../utils/vulnerability-check.js"

export async function audit() {
  logger.highlight("Starting NPM vulnerability audit...");

  const vulnerabilities = await checkVulnerabilities();

  if (vulnerabilities.length === 0) {
    logger.highlight("No vulnerabilities found !");
    return;
  }

  logger.warning("Vulnerabilities found: ");
  vulnerabilities.forEach((v) => {
    console.log(` - Package: ${v.package}`);
    console.log(`   Severity: ${v.severity}`);
    console.log(`   Advisory: ${v.advisory}`);
    console.log("");
  });

  // we highlight the recommendation commands
  logger.highlight(
    "Recommendation: run `npm audit fix` or upgrade packages manually."
  );
}
