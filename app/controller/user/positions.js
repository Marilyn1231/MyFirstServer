'use strict';

module.exports = app => {
  class UserPositionController extends app.Controller {
    async create(ctx) {
      // POST /api/v1/user/positions
      const { longitude, latitude } = ctx.request.body;

      ctx.body = await ctx.model.User.Positions.update(
        { _id: ctx.req.user.sub },
        {
          _id: ctx.req.user.sub,
          type: 'friend',
          loc: {
            type: 'Point',
            coordinates: [ Number(longitude), Number(latitude) ],
          },
        },
        { upsert: true }
      );
      ctx.status = 201;
    }

    async index(ctx) {
      ctx.body = await ctx.model.User.Positions.find({ _id: { $ne: ctx.req.user.sub } });
      ctx.status = 200;
    }
  }
  return UserPositionController;
};
