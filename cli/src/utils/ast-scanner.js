// bu yerda ast scanner util methodni qo'shamiz

export function analyzeSource() {
  const findings = [];
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, "src");

  if (!srcDir) {
    return findings;
  }
}


