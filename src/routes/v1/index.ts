import { Router } from 'express';
import { userRouter } from '../../features/user';
import { authRouter } from '../../features/auth';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
