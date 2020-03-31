const fs = require('fs');

module.exports.writeFile = (outputFileName, file) => {
  fs.writeFile(outputFileName, JSON.stringify(file), 'utf8', function(err) {
    if (err) console.log('==> Error writing file: ', err);
    console.log(`File ${outputFileName} created.`);
  });
};
