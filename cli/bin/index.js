#!/usr/bin/env node

// index.js file content
// console.log(process.argv);

// node ning built-in bo'lgan arg cli parserni ishlatamiz
const arg = require("arg");

// bu yerda biz node ning process.env propertysidan foydalanamiz
// birinchi qismi 'node executable' array [] hisoblanadi va keyingisi esa execute
// qiladigan fileni nomi bo'ladi va uchunchisidan boshlab esa argumentlar bo'ladi.

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    console.log("starting off the app:");
  }
} catch (e) {
  // kutilmagan argumentlarni handle qilamiz
  console.log(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`allowed commands [CMD]: 
        --start\tStart the app
        --build\tBuild the app`);
}
