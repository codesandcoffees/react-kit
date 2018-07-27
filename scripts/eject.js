const fs = require('fs-extra');
const COLORS = require('./colors');

const warn = string => console.log(`${COLORS.FgRed}${string}${COLORS.end}`);
const success = string => console.log(`${COLORS.FgGreen}${string}${COLORS.end}`);
const info = string => console.log(`${COLORS.FgYellow}${string}${COLORS.end}`);

info('Making this yours. Please wait a while.');
console.log()


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

const tasks = [
  { func: removeFolder, params: ['.git'] },
  { func: removeFolder, params: ['docs'] },
  { func: cleanUpPackageJson },
  { func: removeFile, params: ['scripts/colors.js'] },
  { func: removeFile, params: ['scripts/pre-eject.js'] },
  { func: removeFile, params: ['scripts/eject.js'] }
];

// sequentially run the tasks
let tasksCtr = 0;
const tasksLen = tasks.length;
const run = (tasks) => {
  const params = tasks[tasksCtr].params ? tasks[tasksCtr].params : [];
  tasks[tasksCtr].func(...params);
  tasksCtr++;
  if (tasksCtr < tasksLen) {
    setTimeout(() => {
      run(tasks);
    }, 1000);
  } else {
    setTimeout(() => {
      console.log();
      success('Done removing unnecessary folders, files, and lines of code!');
      console.log();
      info('You can now start using this project and push your changes to your repository.\nHappy coding!');
    }, 1000);
  }
};


run(tasks);
