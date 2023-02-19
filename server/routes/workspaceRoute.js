import { Router } from 'express';
import {
  createWorkspace,
  updateWorkspaceTextFields,
  deleteWorkspace,
  getAllUsersWorkspaces,
  leaveWorkspaceParticipants,
  addMembers,
} from '../controllers/workspaceController.js';
import verifyAuth from '../middlewares/auth.js';

const router = Router();

router.post('/', verifyAuth, createWorkspace);
router.patch('/', verifyAuth, updateWorkspaceTextFields);
router.delete('/:id', verifyAuth, deleteWorkspace);
router.get('/', verifyAuth, getAllUsersWorkspaces);
router.post('/leave', verifyAuth, leaveWorkspaceParticipants);
router.post('/add-members', verifyAuth, addMembers);

export default router;
