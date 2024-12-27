export function generateSuggestions({
  securityFindings,
  vulnerabilities,
  buildTime,
  bundleSizes,
  memoryUsage,
}) {
  const suggestions = [];

  if (securityFindings.length > 0) {
    suggestions.push(
      "Add secure headers (consider using 'helmet' for Node servers)."
    );
  }

  if (vulnerabilities.some((v) => v.severity === "high")) {
    suggestions.push(
      "Pls update vulnerable packages using `npm audit fix` or upgrade them manually."
    );
  }

  const totalBundleSize = Object.values(bundleSizes).reduce((a, b) => a + b, 0);
  // 500KB threshold for now
  if (totalBundleSize > 500 * 1024) {
    suggestions.push(
      "Consider code splitting or dynamic imports to reduce bundle size."
    );
  }

  if (buildTime > 3000) {
    suggestions.push(
      "Pls optimize your build or cache vendor modules to improve build speed."
    );
  }

  if (Number(memoryUsage) > 100) {
    suggestions.push(
      "Pls reduce memory usage by limiting simultaneous build tasks or upgrading hardware."
    );
  }

  return suggestions;
}
