'use strict';

module.exports = app => {
  class PostService extends app.Service {
    async create(user, body) {
      const post = {
        userId: user.sub,
        loc: {
          type: 'Point',
          coordinates: [ body.longitude, body.latitude ],
        },
        type: body.type,
        data: body.data,
      };

      return await this.ctx.model.Posts.create(post);
    }
    // 封装统一的调用检查函数，可以在查询、创建和更新等 service 中复用
    // checkSuccess(result) {
    //   if (result.status !== 200) {
    //     const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
    //     this.ctx.throw(result.status, errorMsg);
    //   }
    //   if (!result.data.success) {
    //     // 远程调用返回格式错误
    //     this.ctx.throw(500, 'remote response error', { data: result.data });
    //   }
    // }
  }
  return PostService;
};
