import express from 'express';

import { getTasks, createTasks, updateTasks, deleteTasks } from '../controllers/tasksController.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.post('/', auth, createTasks);
router.patch('/:id', auth, updateTasks);
router.delete('/:id', auth, deleteTasks);

export default router;