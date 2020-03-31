const { spawn } = require('child_process');
const lineReader = require('readline');

module.exports.getFiles = function(folder, type) {
  let command;

  if (type === 'changed')
    command = `git diff --name-only  HEAD | grep "^${folder}"`;

  if (type === 'all') command = `find ${folder} -name "*.js"`;

  return executeCommandAndReturnFilesArray(command);
};

function executeCommandAndReturnFilesArray(command) {
  return new Promise((resolve, reject) => {
    let files = [];

    let child = spawn(command, { cwd: process.cwd(), shell: true });
    child.stdout.setEncoding('utf8');

    const lr = lineReader.createInterface({ input: child.stdout });

    lr.on('line', function(line) {
      files.push(line);
    });

    child.on('close', code => {
      if (code > 0) console.log(`child process exited with code ${code}`);
      resolve(files);
    });
  });
}
