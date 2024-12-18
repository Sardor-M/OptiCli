import chalk from "chalk";
import debug from "debug";

// it only receive a name and returns an logger object
function createLogger(name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    debug: debug(name),
  };
}

export const logger = createLogger("default");
