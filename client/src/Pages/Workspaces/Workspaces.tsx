import { useState } from 'react';

import CreateWorkspaceForm from '../../Components/CreateWorkspaceForm';
import Modal from '../../Components/Modal';
import Workspace from '../../Components/Workspace';
import {
  useGetAllWorkspacesQuery,
  // useCreateWorkspaceMutation,
  // useCreateBoardMutation,
  // useDeleteWorkspaceMutation,
  // useUpdateWorkspaceMutation,
} from '../../store/reducers/workspace/workspace.api';
import './Workspaces.scss';

function Workspaces() {
  const { data = [] } = useGetAllWorkspacesQuery();
  // const [createBoard, { isLoading }] = useCreateBoardMutation();
  // const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();
  // const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();
  // const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="workspaces">
      <div className="workspaces__container">
        <div className="workspaces__header">
          <h1 className="workspaces__title">Ваши рабочие пространства</h1>
          <button className="form-btn form-btn--small" type="button" onClick={handleOpenModal}>
            Создать рабочее пространство
          </button>
        </div>

        {data.map((ws) => (
          <Workspace key={ws._id} data={ws} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateWorkspaceForm onClose={handleCloseModal} />
      </Modal>
    </main>
  );
}

export default Workspaces;
