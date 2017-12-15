'use strict';

module.exports = app => {
  class PostBrushController extends app.Controller {
    async index(ctx) {
      // GET /api/v1/posts/brushes
      const rule = {
        q: { type: 'string', required: false },
      };
      ctx.validate(rule);

      const user = ctx.req.user;
      const { q } = ctx.query;
      let docs;
      if (q) {
        // search
        docs = await ctx.model.Post.Brushes
          .find({})
          .sort({ createdAt: -1 });
      } else {
        // my posts
        docs = await ctx.model.Post.Brushes
          .find({ userId: ctx.req.user.sub })
          .sort({ createdAt: -1 });
      }
      ctx.body = docs.map(doc => Object.assign({
        nLikes: doc.data.likes.length,
        liked: doc.data.likes.indexOf(user.sub) > -1,
      }, doc._doc));
      ctx.status = 200;
    }

    async create(ctx) {
      // POST /api/v1/post/brushes
      const user = ctx.req.user;
      const body = ctx.request.body;
      const post = {
        userId: user.sub,
        data: Object.assign({ likes: [] }, body.data),
      };

      ctx.body = await ctx.model.Post.Brushes.create(post);
      ctx.status = 201;
    }

    async update(ctx) {
      // PUT /api/v1/post/brushes/:id
      const user = ctx.req.user;
      const _id = ctx.params.id;
      const body = ctx.request.body;

      let doc;
      if (body.liked) {
        doc = await ctx.model.Post.Brushes.findOneAndUpdate({ _id }, {
          $addToSet: { 'data.likes': user.sub },
        });
      } else {
        doc = await ctx.model.Post.Brushes.findOneAndUpdate({ _id }, {
          $pull: { 'data.likes': user.sub },
        });
      }

      ctx.body = Object.assign({
        nLikes: doc.data.likes.length,
        liked: body.liked,
      }, doc._doc);
      ctx.status = 201;
    }
  }
  return PostBrushController;
};
