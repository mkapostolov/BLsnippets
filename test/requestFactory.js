const {
  instance,
  appKey,
  appSecret,
  authorizationString,
  authorizationStringMaster
} = require('./config');

const axios = require('axios');

module.exports.rpcRequest = axios.create({
  method: 'POST',
  baseURL: `https://${instance}-baas.kinvey.com/rpc/${appKey}/custom/`,
  headers: {
    Authorization: authorizationString
  }
});

module.exports.collectionRequestMaster = axios.create({
  baseURL: `https://${instance}-baas.kinvey.com/appdata/${appKey}/`,
  headers: {
    Authorization: authorizationStringMaster
  }
});

module.exports.collectionRequest = axios.create({
  baseURL: `https://${instance}-baas.kinvey.com/appdata/${appKey}/`,
  headers: {
    Authorization: authorizationString
  }
});
