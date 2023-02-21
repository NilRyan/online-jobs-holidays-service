import { Router } from 'express';

import { viewAll, viewById } from 'controllers/holidays';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
const router = Router();

router.get('/', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], viewAll);
router.get('/:code', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], viewById);

export default router;
