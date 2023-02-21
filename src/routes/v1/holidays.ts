import { Router } from 'express';

import { viewAll, viewById, saveHoliday, viewSaved, unsaveHoliday } from 'controllers/holidays';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
const router = Router();

router.get('/', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], viewAll);
router.get('/saved', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], viewSaved);
router.get('/:code', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], viewById);
router.post('/save-holiday', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], saveHoliday);
router.post('/unsave-holiday', [checkJwt, checkRole(['ADMIN', 'SUBSCRIBER'])], unsaveHoliday);

export default router;
