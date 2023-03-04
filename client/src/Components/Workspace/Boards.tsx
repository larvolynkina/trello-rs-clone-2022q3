import { useState } from 'react';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const/const';
import { IWsBoard } from '../../types/workspace';
import Modal from '../Modal';
import CreateBoardForm from '../CreateBoardForm';
import './Boards.scss';

type BoardsProps = {
  data: IWsBoard[];
  workspaceId: string;
};

function Boards({ data, workspaceId }: BoardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = async () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="boards">
      {data.map(({ _id: id, title, backgroundColor, backgroundImage }) => (
        <Link
          key={id}
          to={`${APPRoute.board.replace(':boardId', id)}`}
          className="boards__board"
          style={{
            backgroundColor,
            backgroundImage,
          }}
        >
          <div className="boards__board-fade" />
          {title}
        </Link>
      ))}
      <button
        type="button"
        className="boards__board boards__board--button"
        onClick={handleModalOpen}
      >
        Создать доску
      </button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <CreateBoardForm onClose={handleModalClose} workspaceId={workspaceId} />
      </Modal>
    </div>
  );
}

export default Boards;
