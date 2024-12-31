import chalk from "chalk";
import debug from "debug";

function createLogger(name) {
  const prefix = chalk.blue(`[${name}]`);

  const formatMessage = (color, message) => {
    return `${prefix} ${chalk[color](message)}`;
  };

  return {
    info: (...args) => console.log(formatMessage("cyan", args.join(" "))),

    success: (...args) => console.log(formatMessage("green", args.join(" "))),

    warning: (...args) => console.log(formatMessage("yellow", args.join(" "))),

    error: (...args) => console.log(formatMessage("red", args.join(" "))),

    highlight: (...args) =>
      console.log(formatMessage("magenta", args.join(" "))),

    system: (...args) => console.log(formatMessage("cyan", args.join(" "))),

    network: (...args) => console.log(formatMessage("blue", args.join(" "))),

    database: (...args) => console.log(formatMessage("green", args.join(" "))),

    performance: (...args) =>
      console.log(formatMessage("magenta", args.join(" "))),

    debug: debug(name),
  };
}

export const logger = createLogger("default");

// for later use we use specific logger calls
export const apiLogger = createLogger("api");
export const dbLogger = createLogger("database");
export const authLogger = createLogger("auth");
