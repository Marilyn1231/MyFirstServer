'use strict';

exports.schedule = {
  interval: '2h',
  type: 'all',
  immediate: true,
};

exports.task = async function(ctx) {
  await ctx.service.auth0.update();
  ctx.app.lastUpdateBy = 'force';
};
