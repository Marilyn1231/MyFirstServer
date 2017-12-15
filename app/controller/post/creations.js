'use strict';

module.exports = app => {
  class PostCreationController extends app.Controller {
    async index(ctx) {
      // GET /api/v1/post/creations
      const rule = {
        longitude: { type: 'number', required: false },
        latitude: { type: 'number', required: false },
        max: { type: 'number', required: false },
      };
      ctx.validate(rule);

      const { longitude, latitude, max } = ctx.query;
      if (longitude && latitude) {
        // search around
        ctx.body = await ctx.model.Post.Creations
          .find({})
          // .select('-data.data')
          .where('loc')
          .near({
            center: {
              type: 'Point',
              coordinates: [ Number(longitude), Number(latitude) ],
            },
            maxDistance: Number(max) || 5000,
          });
        ctx.status = 200;
      } else {
        // my posts
        ctx.body = await ctx.model.Post.Creations
          .find({ userId: ctx.req.user.sub });
        // .select('-data.data');
        ctx.status = 200;
      }
    }

    async create(ctx) {
      // POST /api/v1/post/creations
      const user = ctx.req.user;
      const body = ctx.request.body;
      const post = {
        userId: user.sub,
        loc: {
          type: 'Point',
          coordinates: [ body.longitude, body.latitude ],
        },
        accuracy: body.accuracy,
        data: body.data,
      };

      ctx.body = await ctx.model.Post.Creations.create(post);
      ctx.status = 201;
    }

    // async update(ctx) {
    //   // PUT /api/v1/post/creations:id
    //   const { id } = ctx.params;
    //   ctx.body = await ctx.model.Posts.update({ _id: id }, ctx.request.body);
    //   ctx.status = 200;
    // }

    async destroy() {
      // DELETE /api/v1/post/creations/:id
    }

    async new() {
      // GET /api/v1/posts/creations/new
    }

    async show(ctx) {
      // GET /api/v1/posts/creations/:id
      ctx.body = await ctx.model.Post.Creations.findOne({ _id: ctx.params.id });
      ctx.status = 200;
    }

    async edit() {
      // GET /api/v1/posts/:id/edit
    }
  }
  return PostCreationController;
};
