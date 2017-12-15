'use strict';

const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const IpMessagingGrant = AccessToken.IpMessagingGrant;

module.exports = app => {
  class TwilioService extends app.Service {
    get(user) {
      const identity = user.email;

      const ipmGrant = new IpMessagingGrant({
        serviceSid: process.env.TWILIO_IPM_SERVICE_SID,
      });

      const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        { ttl: 86400 }
      );

      token.addGrant(ipmGrant);
      token.identity = identity;

      return {
        identity,
        token: token.toJwt(),
      };
    }
  }
  return TwilioService;
};
