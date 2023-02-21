import { Router } from 'express';

import auth from './auth';
import holidays from './holidays';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/holidays', holidays);

export default router;
