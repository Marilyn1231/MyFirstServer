'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1496065938215_2084';

  // add your config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = { match: '/api' };
  config.security = { csrf: false };

  config.mongoose = {
    url: process.env.MONGO_URL,
    options: { mongos: true },
  };

  return config;
};
