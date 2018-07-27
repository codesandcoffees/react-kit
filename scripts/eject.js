const fs = require('fs-extra');
const COLORS = require('./colors');

const warn = string => console.log(`${COLORS.FgRed}${string}${COLORS.end}`);
const success = string => console.log(`${COLORS.FgGreen}${string}${COLORS.end}`);
const info = string => console.log(`${COLORS.FgYellow}${string}${COLORS.end}`);
const log = string => console.log(string);
const error = (string, err) => {
  warn(`\n${string}`);
  if (err) warn(`[Reason] ${err}\n`);
  info('Exiting...');
  process.exit(1);
}

info('Making this yours. Please wait a while.');
console.log()


const removeFile = (file) => {
  fs.remove(file, (err) => {
    info(`REMOVING FILE: ${file}`);
    if (err) error(`REMOVING FILE FAILED: ${file}`, err);
    success(`REMOVED FILE: ${file}`);
  })
}

const removeFolder = (folder) => {
  fs.remove(folder, (err) => {
    info(`REMOVING FOLDER: ${folder}`);
    if (err) error(`REMOVING FOLDER FAILED: ${folder}`, err);
    success(`REMOVED FOLDER: ${folder}`);
  });
}

const cleanUpPackageJson = () => {
  fs.readFile('package.json', 'utf8', (err, data) => {
    info('CLEANING: package.json');
    if (err) error(`CLEANING FAILED: package.json`, err)
    const packageJson = JSON.parse(data);
    packageJson.homepage = '';
    delete packageJson.scripts.mine;
    delete packageJson.scripts['mine:init'];
    delete packageJson.dependencies['fs-extra'];
    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (writeError) => {
      if (writeError) throw writeError;
      success('CLEANED: package.json');
    });
  });
}

const moveFile = (file) => {
  fs.move(file, './README.md', (err) => {
    info(`MOVING FILE: ${file}`);
    if (err) error(`MOVING FILE FAILED: ${file}`, err)
    success(`MOVED FILE: ${file}`)
  });
}

const tasks = [
  { func: removeFolder, param: '.git' },
  { func: removeFolder, param: 'docs' },
  { func: removeFile, param: 'README.md' },
  { func: removeFile, param: 'scripts/colors.js' },
  { func: removeFile, param: 'scripts/pre-eject.js' },
  { func: removeFile, param: 'scripts/eject.js' },
  { func: moveFile, param: 'scripts/README.md' },
  { func: cleanUpPackageJson },
];

// sequentially run the tasks
let tasksCtr = 0;
const tasksLen = tasks.length;
const run = (tasks) => {
  if (tasks.length < 1) error(`No tasks found`);
  const param = tasks[tasksCtr].param ? tasks[tasksCtr].param : null;
  tasks[tasksCtr].func(param);
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
      info(`Don't forget to initialize your git repository.\nDon't forget to update your README.md.\nHappy coding!`);
    }, 1000);
  }
};


run(tasks);
