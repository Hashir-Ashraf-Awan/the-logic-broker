import { Router } from 'express';
import { healthRouter } from './health.js';
import { contactRouter } from './contact.js';
import { newsletterRouter } from './newsletter.js';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use('/v1', contactRouter);
apiRouter.use('/v1', newsletterRouter);
