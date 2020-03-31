const { buildFile } = require('./buildFile');
const outputFileName = './setup/files/changedFiles.json';

buildFile(outputFileName, 'changed');
