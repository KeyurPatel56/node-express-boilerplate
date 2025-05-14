import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { responseFormatter } from './responseFormatter';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import config from '../config/server.config';

export const setupMiddlewares = (app: any) => {
  // Security headers
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  });
  app.use(limiter);

  // CORS Configuration
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true,
    }),
  );

  // JSON and URL-encoded parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Response formatter
  app.use(responseFormatter);

  // i18n Initialization
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
        order: ['header', 'cookie', 'path'],
        caches: false,
      },
    });

  app.use(i18nextMiddleware.handle(i18next));
};
