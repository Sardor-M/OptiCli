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
  logger.debug("Parsed config: ", config);

  // here we ccheck for dev server headers (HTTPS, headers)
  const headerFindings = checkSecurityHeaders(config, configType);

  logger.debug("Analyzing source code for insecure patterns...");
  const sourceFindings = await analyzeSource();

  printReport([...headerFindings, ...sourceFindings]);
}

function printReport(findings) {
  logger.highlight("\n=== Secure Check Report ===");
  if (findings.length === 0) {
    console.log("No major findings ! Your project looks fine and secure.");
  } else {
    findings.forEach((finding) => {
      console.log("-", finding);
    });
  }
  console.log("============================\n");
}
