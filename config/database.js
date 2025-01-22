const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres'); // Set default to 'postgres'

  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      debug: false,
      acquireConnectionTimeout: 600000,
      pool: {
        min: 0,
        max: 100,
        acquireTimeoutMillis: 300000,
        createTimeoutMillis: 300000,
        destroyTimeoutMillis: 50000,
        idleTimeoutMillis: 300000,
        reapIntervalMillis: 10000,
        createRetryIntervalMillis: 2000,
        propagateCreateError: false,
      },
    },
  };
};
