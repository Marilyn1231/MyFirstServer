'use strict';

module.exports = app => {
  // app.get('/', 'home.index');
  app.resources('services', '/api', app.controller.services);

  app.resources('posts', '/api/v1/posts', app.controller.posts);
  app.resources('post/creations', '/api/v1/post/creations', app.controller.post.creations);
  app.resources('post/brushes', '/api/v1/post/brushes', app.controller.post.brushes);

  app.resources('positions', '/api/v1/positions', app.controller.positions);
  // app.resources('twilio', '/api/v1/twilio', app.controller.twilio);

  app.resources('user/positions', '/api/v1/user/positions', app.controller.user.positions);

  // app.resources('auth0/users', '/api/v1/auth0/users', app.controller.auth0.users);
  // app.resources('auth0/avatar', '/api/v1/auth0/avatar', app.controller.auth0.avatar);
};
