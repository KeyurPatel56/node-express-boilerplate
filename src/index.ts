import express from 'express';
import { setupMiddlewares } from './middlewares';
import { addTraceIdMiddleware } from './utils/tracing';
import { closeDatabase, connectDatabase } from './db';
import Sentry from '@sentry/node';
import router from './routes';
import logger, { flushLogs } from './utils/logger';
import config from './config/server.config';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Sentry
Sentry.init({
  dsn: config.sentryDSN,
  tracesSampleRate: 1.0,
});

// Add trace ID middleware
app.use(addTraceIdMiddleware);

// Setup middlewares
setupMiddlewares(app);

// Use the consolidated router
app.use('/', router);

// Setup Sentry error handler
Sentry.setupExpressErrorHandler(app);

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

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await closeDatabase();
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (err: Error) => {
  logger.error('Unhandled Rejection', { error: err });
  await flushLogs();
  process.exit(1);
});

// Start server if this file is run directly
if (require.main === module) {
  startServer();
}
