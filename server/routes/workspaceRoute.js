import { Router } from 'express';
import { createWorkspace, updateWorkspaceTextFields, deleteWorkspace } from '../controllers/workspaceController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createWorkspace);
router.patch('/', verifyAuth, updateWorkspaceTextFields);
router.delete('/:id', verifyAuth, deleteWorkspace);

export default router;
