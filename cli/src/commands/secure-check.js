import chalk from "chalk";
import { logger } from "../../logger.js";
import { analyzeSource } from "../utils/ast-scanner.js";
import { detectConfig, parseConfig } from "../utils/config-parser.js";
import { checkSecurityHeaders } from "../utils/security-headers.js";

export async function secureCheck() {
  logger.highlight("Running security checks ...");
  const configType = detectConfig();
  if (!configType) {
    logger.warning("NO Webpack or Vite Configs are found.");
    return;
  }

  const config = await parseConfig(configType);
  logger.info("Parsed config: ", config);

  // here we ccheck for dev server headers (HTTPS, headers)
  const headerFindings = checkSecurityHeaders(config, configType);

  logger.info("Analyzing source code for insecure patterns...");
  const sourceFindings = await analyzeSource();

  printReport([...headerFindings, ...sourceFindings]);
}

function printReport(findings) {
  console.log("\n");
  logger.highlight("=== Secure Check Report ===");
  if (findings.length === 0) {
    console.log("No major findings ! Your project looks fine and secure.");
  } else {
    logger.info("Major Findings:");
    findings.forEach((finding, index) => {
      console.log(chalk.yellow(`  ${index + 1}. ${finding}`));
    });
  }
  console.log("============================\n");
}
