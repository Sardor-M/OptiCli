#!/usr/bin/env node

// index.js file content

import arg from "arg"; // node ning built-in bo'lgan arg cli parserni ishlatamiz
import chalk from "chalk"; // chalk libray esa rang berish uchun ishlatamiz
import { logger } from "../logger.js";
import { analyze } from "../src/commands/test.js";
import { audit } from "../src/commands/audit.js";

async function main() {
  try {
    const args = arg(
      {
        "--help": Boolean,
        "--version": Boolean,
      },
      {
        permissive: true,
      }
    );

    const cmd = args._[0];

    logger.debug("Received args", args);

    if (args["--help"] || !cmd) {
      // const config = getConfig();
      // start(config);
      usage();
      process.exit(0);
    } else if (cmd === "test") {
      await analyze();
    } else if (cmd === "audit") {
      await audit();
    } else {
      logger.warning(`Unkown command: ${cmd}`);
      usage();
    }
  } catch (e) {
    // kutilmagan argumentlarni handle qilamiz
    logger.warning(e.message);
    console.log();
    usage();
  }
}

function usage() {
  console.log(`${chalk.whiteBright("opti-cli [command] [options]")}
    ${chalk.greenBright("Commands:")}
      test     \tRun full analysis (config, security, advanced checks, performance, etc.)
      audit    \tRun NPM vulnerability audit only

    ${chalk.greenBright("Options:")}
      --help   \tShow usage information

    Examples:
      opti-cli test
      opti-cli audit
  `);
}

main().catch((error) => {
  logger.log("An unexpected error occured: ", error);
  process.exit(1);
});



// bu yerda biz node ning process.env propertysidan foydalanamiz
// birinchi qismi 'node executable' array [] hisoblanadi va keyingisi esa execute
// qiladigan fileni nomi bo'ladi va uchunchisidan boshlab esa argumentlar bo'ladi.
