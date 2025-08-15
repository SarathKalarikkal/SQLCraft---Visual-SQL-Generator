import { Router } from 'express';
import { sqlGenerator } from '../controllers/sqlController.js';
import { tableGenerator, getAllTables } from '../controllers/tableController.js';

const router = Router();

router.post('/generate-sp', sqlGenerator);
router.post('/create-table', tableGenerator);
router.get('/tables',getAllTables)
export default router;
