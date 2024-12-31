// this is where we analyze the project

import { logger } from "../../logger.js";
import { checkVulnerabilities } from "../utils/vulnerability-check.js";
import runBuildAndMeasure from "../utils/build-runner.js";
import { generateSuggestions } from "../utils/suggestions.js";
import { detectConfig, parseConfig } from "../utils/config-parser.js";

export async function analyze() {
  logger.highlight("Starting analysis...");

  const configType = detectConfig();
  if (!configType) {
    logger.warning("No Webpack or Vite config found. Exiting.");
    return;
  }

  console.log("Parsing config...");
  const config = await parseConfig(configType);
  logger.debug("Parsed config:", config);

  console.log("Analyzing security headers...");
  // here we analyze security headers (when dev server starts)
  const securityFindings = analyzeSecurity(config, configType);

  const vulnerabilities = await checkVulnerabilities();
  console.log("Vulnerabilities checked. Found:", vulnerabilities.length);

  console.log("Running build and measuring performance...");
  // we measure the performance
  const { buildTime, bundleSizes, memoryUsage } = await runBuildAndMeasure(
    configType
  );
  console.log("Build finished:", buildTime, bundleSizes, memoryUsage);

  const suggestions = generateSuggestions({
    securityFindings,
    vulnerabilities,
    buildTime,
    bundleSizes,
    memoryUsage,
  });

  // we print the suggestions
  printReport({
    securityFindings,
    vulnerabilities,
    buildTime,
    bundleSizes,
    memoryUsage,
    suggestions,
  });

  console.log("Analysis complete!");

  function analyzeSecurity(config, configType) {
    const findings = [];
    if (configType === "webpack") {
      if (!config.devServer || !config.devServer.headers) {
        findings.push(
          "Missing security headers in Webpack devServer. Consider CORS and security headers"
        );
      }
    } else {
      if (!config.server || !config.server.headers) {
        findings.push(
          "Missing security headers in Virte dev server. Consider adding headers or using HTTPS."
        );
      }
    }
    return findings;
  }

  function printReport(report) {
    console.log("\n");
    logger.highlight("=== Analysis Report ===");
    if (report.securityFindings.length > 0) {
      console.log("Security Findings:");
      report.securityFindings.forEach((f) => console.log("- ", f));
    } else {
      console.log("No major security issues detected in dev server setup");
    }

    console.log("\n");
    logger.warning("Vulnerabilities:");
    if (report.vulnerabilities.length > 0) {
      report.vulnerabilities.forEach((v) =>
        console.log(`- ${v.package}: ${v.severity} - ${v.advisory}`)
      );
    } else {
      console.log("No known vulnerabilities found.");
    }
    
    console.log("\n");
    logger.info(`Build Time: ${report.buildTime}ms`);
    console.log("Bundle Sizes:");

    Object.entries(report.bundleSizes).forEach((bundle, size) => {
      console.log(`- ${bundle}: ${(size / 1024).toFixed(2)} KB`);
    });

    console.log(`Memory Usage: ${report.memoryUsage} MB`);

    console.log("\n");
    logger.success("Suggestions:");
    if (report.suggestions.length > 0) {
      report.suggestions.forEach((s) => console.log("- ", s));
    } else {
      console.log("Your setup looks good! No immediate suggestions.");
    }
    console.log("======================\n");
  }
}
