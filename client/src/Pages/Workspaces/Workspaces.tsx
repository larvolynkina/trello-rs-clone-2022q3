import { useState } from 'react';

import CreateWorkspaceForm from '../../Components/CreateWorkspaceForm';
import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import Workspace from '../../Components/Workspace';
import { useGetAllWorkspacesQuery } from '../../store/reducers/workspace/workspace.api';
import './Workspaces.scss';

function Workspaces() {
  const { data = [], isLoading } = useGetAllWorkspacesQuery();
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

        {isLoading && <Loader />}

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
