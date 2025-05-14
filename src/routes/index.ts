import { StatusCodes } from 'http-status-codes';
import { Router } from 'express';
import v1Routes from './v1';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerSpec } from '../utils/swagger';

const router = Router();

// Main route
router.get('/', (req, res) => {
  res.success(
    { message: req.t('greeting') },
    StatusCodes.OK,
    req.t('API is running'),
  );
});

// Load health route
router.use('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'UP',
    message: req.t('health'),
    timestamp: new Date().toISOString(),
  });
});

router.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('Sentry debug error!');
});

// Placeholder for additional routes
// Example: router.use('/users', userRouter);
router.use('/api/v1', v1Routes);

// Swagger setup for API documentation
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Node Express Boilerplate API',
//       version: '1.0.0',
//       description: 'API documentation for the Node Express Boilerplate project',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Development server',
//       },
//     ],
//   },
//   apis: ['./src/routes/*.ts'], // Path to the API docs
// };

// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
  }),
);

export default router;
