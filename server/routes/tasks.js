import express from 'express';

import { getTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTasks);
router.patch('/:id', updateTasks);
router.delete('/:id', deleteTasks);

export default router;