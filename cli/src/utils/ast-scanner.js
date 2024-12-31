import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";
import * as BabelTraverse from "@babel/traverse";

// here we decsrtucture the traverse(function) to real function
const {
  default: { default: traverse },
} = BabelTraverse;

// bu yerda ast scanner util methodni qo'shamiz
export function analyzeSource() {
  const findings = [];
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, "src");

  if (!srcDir) {
    return findings;
  }

  if (!fs.existsSync(srcDir)) {
    return findings;
  }

  const files = findAllFiles(srcDir, [".js", ".ts", ".jsx", ".tsx"]);
  for (const file of files) {
    const code = fs.readFileSync(file, "utf-8");
    try {
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      traverse(ast, {
        CallExpression(path) {
          if (path.node.callee.name === "eval") {
            findings.push(
              `Potentially unsafe eval() in ${file} at line ${path.node.loc?.start.line}`
            );
          }
        },
        MemberExpression(path) {
          // here we check for process.env in frontend usage
          if (
            path.node.object?.name === "process" &&
            path.node.property?.name === "env"
          ) {
            findings.push(
              `process.env usage in front-end code at ${file}, in line of ${path.node.loc?.start.line}`
            );
          }
        },
      });

      // and we check for the too many console logs ( regex for console.logs )
      const consoleLogs = (code.match(/console\.log/g) || []).length;

      if (consoleLogs > 10) {
        findings.push(
          `${file} has ${consoleLogs} console.log statements. Consider cleaning up logs.`
        );
      }
    } catch (error) {
      findings.push(`Error parsing the ${file}: ${error.message}`);
    }
  }

  return findings;
}

function findAllFiles(dir, exts, result = []) {
  fs.readdirSync(dir).forEach((item) => {
    if (["node_modules", ".git", "dist"].includes(item)) {
      return;
    }

    const filePath = path.join(dir, item);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      findAllFiles(filePath, exts, result);
    } else if (stats.isFile() && exts.some((ext) => item.endsWith(ext))) {
      result.push(filePath);
    }
  });

  return result;
}
