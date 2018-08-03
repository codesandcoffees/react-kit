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
    if (err) error(`CLEANING - READ FAILED: package.json`, err)
    const packageJson = JSON.parse(data);
    packageJson.homepage = '';
    packageJson.name = '';
    delete packageJson.scripts.mine;
    delete packageJson.scripts['mine:init'];
    delete packageJson.dependencies['fs-extra'];
    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), writeError => {
      if (writeError) error(`CLEANING - WRITE FAILED: package.json`, err)
      success('CLEANING SUCCESS: package.json');
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

const rewriteFile = (file, target, source) => {
  fs.readFile(file, 'utf8', (err, data) => {
    info(`REWRITING FILE: ${file}`);
    if (err) error(`REWRITING FILE - READ FAILED: ${file}`, err);
    const replace = new RegExp(target, 'g');
    const newText = data.replace(replace, source);
    fs.writeFile(file, newText, 'utf8', err => {
      if (err) if (err) error(`REWRITING FILE - WRITE FAILED: ${file}`, err);
      success(`REWRITING FILE SUCCESS: ${file}`)
    })
  });
}

const cleanUpManifestJson = () => {
  fs.readFile('public/manifest.json', 'utf8', (err, data) => {
    info('CLEANING: public/manifest.json');
    if (err) error('CLEANING - READ FAILED: public/manifest.json');
    const manifestjson = JSON.parse(data);
    console.log(manifestjson)
    manifestjson.short_name = 'New Project name';
    manifestjson.name = 'New project description';
    fs.writeFile('public/manifest.json', JSON.stringify(manifestjson, null, 2), writeError => {
      if (writeError) error('CLEANING - WRITE FAILED: public/manifest.json');
      success('CLEANING SUCCESS: public/manifest.json');
    })
  })
}

const tasks = [
  { func: removeFolder, params: ['.git'] },
  { func: removeFolder, params: ['docs'] },
  { func: removeFile, params: ['README.md'] },
  { func: removeFile, params: ['scripts/colors.js'] },
  { func: removeFile, params: ['scripts/pre-eject.js'] },
  { func: removeFile, params: ['scripts/eject.js'] },
  { func: removeFile, params: ['package-lock.json'] },
  { func: moveFile, params: ['scripts/README.md'] },
  { func: rewriteFile, params: ['public/index.html', '<title>React Kit</title>', '<title>New Project Name</title>'] },
  { func: cleanUpPackageJson },
  { func: cleanUpManifestJson }
];

// sequentially run the tasks
let tasksCtr = 0;
const tasksLen = tasks.length;
const run = (tasks) => {
  if (tasks.length < 1) error(`No tasks found`);
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
      info(`Don't forget to initialize your git repository.\nDon't forget to update your README.md.\nDon't forget to update your homepage in "package.json"\nHappy coding!`);
    }, 1000);
  }
};


run(tasks);
