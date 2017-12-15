'use strict';

module.exports = app => {
  class TwilioController extends app.Controller {
    index(ctx) {
      // GET /api/v1/twilio
      ctx.body = ctx.service.twilio.get(ctx.req.user);
      ctx.status = 200;
    }
  }
  return TwilioController;
};
