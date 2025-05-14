import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  databaseUrl: process.env.DATABASE_URL || '',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    directory: path.join(__dirname, '../../locales'),
  },
  sentryDSN: process.env.SENTRY_DSN || '',

  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  isStaging: process.env.NODE_ENV === 'staging',

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET || 'access_secret_key_change_in_production',
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || 'refresh_secret_key_change_in_production',
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m', // 15 minutes
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d', // 7 days
};

export default config;
