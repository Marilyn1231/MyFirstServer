'use strict';

const jwt = require('jsonwebtoken');

function verifyJwt(req) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return Promise.reject('miss authorization header');
  }

  const parts = authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return Promise.reject('invalid authorization header');
  }

  return new Promise((resolve, rejected) => {
    jwt.verify(
      parts[1],
      process.env.AUTH0_CLIENT_SECRET,
      {
        algorithms: 'HS256',
        audience: process.env.AUTH0_CLIENT_ID,
        issuer: 'https://hippoar.auth0.com/',
      },
      (err, data) => {
        if (err) {
          rejected(err.message);
        }

        req.user = data;
        resolve();
      }
    );
  });
}

module.exports = () => {
  return async function auth0(ctx, next) {
    try {
      await verifyJwt(ctx.req);
    } catch (err) {
      ctx.status = 401;
      ctx.body = { message: err };
      return;
    }

    await next();
  };
};
