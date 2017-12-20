'use strict';

module.exports = app => {
  app.resources('posts', '/api/v1/posts', app.controller.posts);
  app.resources('polls', '/api/v1/polls', app.controller.polls);

  app.resources('positions', '/api/v1/positions', app.controller.positions);
};
