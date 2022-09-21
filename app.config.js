import 'dotenv/config';

module.exports = {
  name: 'rnauthstarter',
  version: '1.0.0',
  extra: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
};
