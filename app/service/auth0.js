'use strict';

const Auth0 = require('auth0');

const auth0 = new Auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_SERVER_CLIENT_ID,
  clientSecret: process.env.AUTH0_SERVER_SECRET,
});

module.exports = app => {
  let grant = '';
  let client = null;

  class Auth0Service extends app.Service {
    async update() {
      grant = await auth0.oauth.clientCredentialsGrant({
        audience: process.env.AUTH0_AUDIENCE,
      });

      client = new Auth0.ManagementClient({
        token: grant.access_token,
        domain: process.env.AUTH0_DOMAIN,
      });

      return grant;
    }

    getUsers() {
      return client.getUsers({});
    }

    getUser({ id }) {
      return client.getUser({ id });
    }
  }
  return Auth0Service;
};
