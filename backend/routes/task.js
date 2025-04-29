import express from 'express';
import { body } from 'express-validator';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.js';
import protectRoute from '../middleware/verify.js';

const router = express.Router();

router.use(protectRoute);

router.get('/', getTasks);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['To do', 'In Progress', 'Done']).withMessage('Invalid status')
  ],
  createTask
);
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('status').optional().isIn(['To do', 'In Progress', 'Done']).withMessage('Invalid status')
  ],
  updateTask
);
router.delete('/:id', deleteTask);

export default router;
