import { Router } from 'express';
import { createWorkspace, updateWorkspaceTextFields, deleteWorkspace, getAllUsersWorkspaces } from '../controllers/workspaceController.js';
import verifyAuth from "../middlewares/auth.js";

const router = Router();

router.post('/', verifyAuth, createWorkspace);
router.patch('/', verifyAuth, updateWorkspaceTextFields);
router.delete('/:id', verifyAuth, deleteWorkspace);
router.get('/', verifyAuth, getAllUsersWorkspaces);

export default router;
