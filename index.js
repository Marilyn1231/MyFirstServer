'use strict';
// npm run dev DO NOT read this file
require('dotenv').config();

require('egg').startCluster({
  baseDir: __dirname,
  port: process.env.PORT || 7001, // default to 7001
  workers: process.env.EGG_WORKERS || 1,
});
