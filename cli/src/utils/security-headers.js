export function checkSecurityHeaders(config, configType) {
    const findings = [];
  
    if (configType === "webpack") {
      if (!config.devServer) {
        findings.push("No devServer configs in webpack.config.js");
      } else {
        if (!config.devServer.https) {
          findings.push("Dev server is not using HTTPS (webpack). Consider enabling https: true");
        }
        if (!config.devServer.headers) {
          findings.push("Missing security headers in webpack devServer. Consider adding 'Content-Security-Policy'");
        }
      }
    } else {
      if (!config.server) {
        findings.push("No server configs in vite.config.js");
      } else {
        if (!config.server.https) {
          findings.push("Dev server is not using HTTPS (Vite). Consider enabling https: true");
        }
        if (!config.server.headers) {
          findings.push("Missing security headers in Vite dev server. Consider adding 'Content-Security-Policy'");
        }
      }
    }
  
    return findings;
  }
  