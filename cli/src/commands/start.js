import chalk from "chalk";

export function start(config) {
  console.log(chalk.bgCyanBright("Starting the app: "));
  console.log(chalk.gray("Received configs in the start - "), config);
}
