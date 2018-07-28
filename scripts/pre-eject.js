const fs = require('fs');
const COLORS = require('./colors');

if (!fs.existsSync('node_modules/fs-extra')) {
  console.log(`${COLORS.FgRed}Kindly run "npm i fs-extra" first to proceed${COLORS.end}`)
  console.log();
  process.exit(1);
}
