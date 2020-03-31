const { getFiles } = require('./utils/getFiles');
const { buildPart } = require('./utils/buildPart');
const { writeFile } = require('./utils/writeFile');

module.exports.buildFile = async function(outputFileName, type) {
  let configFile = {
    schemaVersion: '1.0.0',
    configType: 'environment'
  };

  const endpointFiles = await getFiles('endpoints', type);
  const customEndpoints = buildPart(endpointFiles);
  configFile.customEndpoints = customEndpoints;

  const commonFiles = await getFiles('common', type);
  const commonCode = buildPart(commonFiles);
  configFile.commonCode = commonCode;

  const hooksFiles = await getFiles('hooks', type);
  const collectionHooks = buildPart(hooksFiles);
  configFile.collectionHooks = collectionHooks;

  writeFile(outputFileName, configFile);
};
