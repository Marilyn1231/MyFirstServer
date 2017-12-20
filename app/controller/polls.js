'use strict';

module.exports = app => {
  class PollController extends app.Controller {
    // async index(ctx) {
    //   // GET /api/v1/posts
    //
    //   console.log(ctx.query);
    //   const x = Number(ctx.query.x);
    //
    //   // '1' + 1 = '11'
    //   ctx.status = 200;
    //   ctx.body = { x_plus_1: x + 1 };
    // }

    async create(ctx) {
      // POST /api/v1/polls
      const body = ctx.request.body;

      const poll = {
        user: body.user,
        receiver: body.receiver,
      };

      const existingPoll = await ctx.model.Polls.findOne(poll);

      if (existingPoll) {
        console.log('poll already exists');
        ctx.status = 300;
        ctx.body = 'poll already exists';
      } else {
        console.log('new poll');
        ctx.body = await ctx.model.Polls.create(poll);
        ctx.status = 201;
      }
    }

    // async update(ctx) {
    //   // PUT /api/v1/posts/:id
    //   const { id } = ctx.params;
    //   ctx.body = await ctx.model.Posts.update({ _id: id }, ctx.request.body);
    //   ctx.status = 200;
    // }
  }
  return PollController;
};
