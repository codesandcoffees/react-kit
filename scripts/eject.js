const fs = require('fs-extra');
const COLORS = require('./colors');

console.log(`${COLORS.FgYellow}Making this yours. Please wait a while.${COLORS.end}`);

const removeFolder = (folder) => {
  fs.remove(folder, (err) => {
    console.log(`${COLORS.BgRed}${COLORS.FgWhite}Removing ${folder} folder${COLORS.end}`);
    if (err) throw err;
    console.log(`${COLORS.FgGreen}${folder} folder deleted${COLORS.end}`);
  });
}

const queue = (tasks) => {
  tasks.forEach((task, i) => {
    task.func(...task.params)
  });
};

const tasks = [
  { func: removeFolder, params: ['.git'] },
  { func: removeFolder, params: ['docs'] }
];

queue(tasks);
