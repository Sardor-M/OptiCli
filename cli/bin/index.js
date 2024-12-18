#!/usr/bin/env node

// index.js file content
// console.log(process.argv);

import arg from "arg"; // node ning built-in bo'lgan arg cli parserni ishlatamiz
import chalk from "chalk"; // chalk libray esa rang berish uchun ishlatamiz
import { getConfig } from "../src/config/config-mgr.js";
import { start } from "../src/commands/start.js";
import { logger } from "../logger.js";
import { error } from "console";

// bu yerda biz node ning process.env propertysidan foydalanamiz
// birinchi qismi 'node executable' array [] hisoblanadi va keyingisi esa execute
// qiladigan fileni nomi bo'ladi va uchunchisidan boshlab esa argumentlar bo'ladi.

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  logger.debug("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }
} catch (e) {
  // kutilmagan argumentlarni handle qilamiz
  logger.warning(error.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("cli [CMD]")}:
      ${chalk.greenBright("--start")}\tStart the app
      ${chalk.greenBright("--build")}\tBuild the app
  `);
}
