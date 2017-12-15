'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1496065938215_2084';

  // add your config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = { match: '/api' };
  // config.auth0 = {
  //   match(ctx) {
  //     const url = ctx.request.url;
  //     if (url === '/api' || url.indexOf('/api?') === 0) {
  //       return false;
  //     }
  //     if (url.indexOf('/api/v1/auth0/avatar') === 0) {
  //       return false;
  //     }
  //     return true;
  //   },
  // };
  // config.security = { csrf: { ignoreJSON: true } };
  config.security = { csrf: false };

  // config.mongoose = {
  //   url: process.env.MONGO_URL,
  //   options: { mongos: true },
  // };

  return config;
};
