import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger';
import { responseFormatter } from './middlewares/responseFormatter';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import config from './config/server.config';
import Backend from 'i18next-fs-backend';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { connectDatabase } from './db';
import Sentry from '@sentry/node';

const app = express();
const PORT = process.env.PORT || 3000;

Sentry.init({
  dsn: config.sentryDSN,
  tracesSampleRate: 1.0, // Adjust sampling in production
});

// Middleware for security headers
app.use(helmet());

// Middleware for rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
});
app.use(limiter);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply response formatter middleware
app.use(responseFormatter);

// CORS Configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  }),
);

// Initialize i18n
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: config.i18n.defaultLocale,
    preload: config.i18n.locales,
    backend: {
      loadPath: `${config.i18n.directory}/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['header', 'cookie', 'path'], // Language detection order
      caches: false, // Disable caching (e.g., cookies)
    },
  });

// Apply i18n middleware
app.use(i18nextMiddleware.handle(i18next));

// Use the consolidated router
app.use('/', router);

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start listening for requests
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info(
        `API Documentation available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection', { error: err });
  // Close server & exit process
  process.exit(1);
});

// Start server
if (require.main === module) {
  startServer();
}
