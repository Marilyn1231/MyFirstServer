'use strict';

module.exports = app => {
  class Auth0UserController extends app.Controller {
    async create(ctx) {
      // POST /api/v1/auth0/users
      ctx.body = 'test';
      ctx.status = 201;
    }

    async index(ctx) {
      // GET /api/v1/auth0/users
      ctx.body = await ctx.service.auth0.getUsers();
      ctx.status = 200;
    }

    async show(ctx) {
      // GET /api/v1/auth0/users/:id
      const { id } = ctx.params;
      ctx.body = await ctx.service.auth0.getUser({ id });
      ctx.status = 200;
    }
  }
  return Auth0UserController;
};
