import { Router } from 'express';

import { view } from 'controllers/holidays';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
const router = Router();

router.get('/', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], view);

export default router;
