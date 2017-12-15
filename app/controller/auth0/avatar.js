'use strict';

module.exports = app => {
  class Auth0AvatarController extends app.Controller {
    async show(ctx) {
      // GET /api/v1/auth0/users/:id
      const { id } = ctx.params;
      const user = await ctx.service.auth0.getUser({ id });
      if (user.user_metadata && user.user_metadata.picture) {
        ctx.set('Location', user.user_metadata.picture);
      } else {
        ctx.set('Location', user.picture);
      }
      ctx.status = 303;
    }
  }
  return Auth0AvatarController;
};
