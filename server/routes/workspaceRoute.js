import { Router } from 'express';
import { createWorkspace, updateWorkspaceTextFields, deleteWorkspace } from '../controllers/workspaceController.js';

const router = Router();

router.post('/', createWorkspace);
router.patch('/', updateWorkspaceTextFields);
router.delete('/:id', deleteWorkspace);

export default router;
