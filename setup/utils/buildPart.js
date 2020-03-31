module.exports.buildPart = function(items) {
  let obj = {};

  for (const item of items) {
    const itemParts = item.split('/');

    const folder = itemParts[0];
    const file = itemParts[itemParts.length - 1];
    const fileName = file.split('.')[0];
    let path = `../../${folder}/${file}`;

    if (folder === 'hooks') {
      const collectionName = itemParts[1];
      path = `../../${folder}/${collectionName}/${file}`;

      if (!obj[collectionName]) obj[collectionName] = {};

      obj[collectionName][fileName] = {
        type: 'internal',
        codeFile: path
      };
    } else if (folder === 'endpoints') {
      obj[fileName] = {
        type: 'internal',
        codeFile: path
      };
    } else if (folder === 'common') {
      obj[fileName] = {
        codeFile: path
      };
    }
  }

  return obj;
};
