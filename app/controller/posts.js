'use strict';

module.exports = app => {
  class PostController extends app.Controller {
    async index(ctx) {
      // GET /api/v1/posts

      const x = ctx.req.x;

      ctx.status = 200;
      ctx.body = { "x_plus_1": x+1 };
    }

    async create(ctx) {
      // POST /api/v1/posts
      const user = ctx.req.user;
      const body = ctx.request.body;
      const post = {
        userId: user.sub,
        loc: {
          type: 'Point',
          coordinates: [ body.longitude, body.latitude ],
        },
        accuracy: body.accuracy,
        type: body.type,
        data: body.data,
      };

      ctx.body = await ctx.model.Posts.create(post);
      ctx.status = 201;
    }

    // async update(ctx) {
    //   // PUT /api/v1/posts/:id
    //   const { id } = ctx.params;
    //   ctx.body = await ctx.model.Posts.update({ _id: id }, ctx.request.body);
    //   ctx.status = 200;
    // }

    async destroy() {
      // DELETE /api/v1/posts/:id
    }

    async new() {
      // GET /api/v1/posts/new
    }

    async show(ctx) {
      // GET /api/v1/posts/:id
      ctx.body = await ctx.model.Posts.findOne({ _id: ctx.params.id });
      ctx.status = 200;
    }

    async edit() {
      // GET /api/v1/posts/:id/edit
    }
  }
  return PostController;
};
