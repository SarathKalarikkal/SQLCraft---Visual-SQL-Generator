import { Router } from 'express';
import { sqlGenerator } from '../controllers/sqlController.js';
import { tableGenerator, getAllTables,getTablesList, deleteATable,getATable, updateATable } from '../controllers/tableController.js';

const router = Router();

router.post('/generate-sp', sqlGenerator);

router.post('/create-table', tableGenerator);
router.get('/tables',getAllTables)
router.get('/tableslists',getTablesList)
router.delete("/tables/:id", deleteATable);
router.put("/table/:id", updateATable);
router.get("/table/:id", getATable);
export default router;
