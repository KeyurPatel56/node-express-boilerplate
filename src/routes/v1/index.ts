import { Router } from 'express';
import { userRouter } from '../../modules/user';
import { authRouter } from '../../modules/auth';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
