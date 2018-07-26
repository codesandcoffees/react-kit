const fs = require('fs');
const COLORS = require('./colors');

if (!fs.existsSync('node_modules/fs-extra')) {
  console.log(`${COLORS.BgRed}${COLORS.FgWhite}Kindly run "npm install fs-extra" first to proceed${COLORS.end}`)
  process.exit(1);
}
