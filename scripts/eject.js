const fs = require('fs-extra');
const COLORS = require('./colors');

console.log(`${COLORS.FgYellow}Making this yours. Please wait a while.${COLORS.end}`);
console.log()

const warn = (string) => console.log(`${COLORS.BgRed}${COLORS.FgWhite}${string}${COLORS.end}`);
const success = (string) => console.log(`${COLORS.FgGreen}${string}${COLORS.end}`);

const removeFile = (file) => {
  fs.remove(file, (err) => {
    warn(`REMOVING FILE: ${file}`);
    if (err) throw err;
    success(`REMOVED FILE: ${file}`)
  })
}

const removeFolder = (folder) => {
  fs.remove(folder, (err) => {
    warn(`REMOVING FOLDER: ${folder}`);
    if (err) throw err;
    success(`REMOVED FOLDER: ${folder}`);
  });
}

const cleanUpPackageJson = () => {
  fs.readFile('package.json', 'utf8', (err, data) => {
    warn('CLEANING: package.json');
    if (err) throw err;
    const packageJson = JSON.parse(data);
    delete packageJson.homepage;
    delete packageJson.scripts.mine;
    delete packageJson.scripts['mine:init'];
    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (writeError) => {
      if (writeError) throw writeError;
      success('CLEANED: package.json');
    });
  });
}

const run = (tasks) => {
  tasks.forEach((task, i) => {
    if (!task.params) { // if no params are passed default an empty array
      task.params = [];
    }
    task.func(...task.params)
  });
};

const tasks = [
  { func: removeFolder, params: ['.git'] },
  { func: removeFolder, params: ['docs'] },
  { func: cleanUpPackageJson },
  { func: removeFile, params: ['scripts/pre-eject.js'] },
  { func: removeFile, params: ['scripts/eject.js'] }
];

run(tasks);
