'use strict';

module.exports = app => {
  class PositionController extends app.Controller {
    async create(ctx) {
      // POST /api/v1/positions
      const body = ctx.request.body;
      const position = Object.assign({
        userId: ctx.req.user.sub,
        longitude: body.longitude,
        latitude: body.latitude,
      }, body.data);

      ctx.body = await this.ctx.model.Positions.create(position);
      ctx.status = 201;
    }
  }
  return PositionController;
};
