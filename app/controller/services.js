'use strict';

module.exports = app => {
  class ServiceController extends app.Controller {
    async index(ctx) {
      // GET /api
      const { longitude, latitude, q } = ctx.query;

      const ne = longitude > 0 ? 'yelp' : 'amap';
      ctx.body = await ctx.model.Services.find({ id: { $ne: ne } }, { _id: 0 });
      ctx.status = 200;
    }
  }
  return ServiceController;
};
