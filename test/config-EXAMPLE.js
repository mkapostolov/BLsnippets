const config = {
  instance: 'kvy-us1',
  appKey: 'kid_Hyu59-1jr',
  appSecret: '',
  masterKey: '',
  authorizationString: 'Kinvey ...',
};

const buff = new Buffer(`${config.appKey}:${config.masterKey}`);
const base64data = buff.toString('base64');
config.authorizationStringMaster = `Basic ${base64data}`;

module.exports = config;
