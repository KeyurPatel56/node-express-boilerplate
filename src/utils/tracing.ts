import asyncHooks from 'async_hooks';
import { randomUUID } from 'crypto';
import logger from './logger';

const traceMap = new Map();

const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    if (traceMap.has(triggerAsyncId)) {
      traceMap.set(asyncId, traceMap.get(triggerAsyncId));
    }
  },
  destroy(asyncId) {
    traceMap.delete(asyncId);
  },
});
asyncHook.enable();

export const addTraceIdMiddleware = (req: any, res: any, next: any) => {
  const traceId = randomUUID();
  traceMap.set(asyncHooks.executionAsyncId(), traceId);

  req.traceId = traceId;

  const startTime = process.hrtime();

  res.on('finish', () => {
    const duration = process.hrtime(startTime);
    const durationMs = duration[0] * 1000 + duration[1] / 1e6;
    logger.info('Request completed', {
      traceId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${durationMs.toFixed(2)}ms`,
    });
  });

  next();
};

export const getTraceId = () =>
  traceMap.get(asyncHooks.executionAsyncId()) || 'unknown';
