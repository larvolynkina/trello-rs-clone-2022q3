import './marks.scss';
import { useEffect, useState } from 'react';
import { IMark } from '../../types/card';
import { useGetBoardByIDQuery } from '../../store/reducers/board/board.api';
import MarkItem from './MarkItem';
import MarkHeader from './MarkHeader';
import MarkEditModal from './MarkEditModal';

type MarksProps = {
  from: 'menu' | 'card';
  boardId: string;
};

function Marks({ from, boardId }: MarksProps) {
  const { data: boardData } = useGetBoardByIDQuery(boardId);
  const [marks, setMarks] = useState<IMark[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeAction, setTypeAction] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    if (boardData) {
      setMarks(boardData.marks);
    }
  }, []);

  const handleCreateMark = () => {
    setIsOpenModal(true);
    setTypeAction('create');
  };
  return (
    <div className="marks">
      {from === 'card' && <MarkHeader isShow={setIsOpenModal} />}
      <ul className="marks__list">
        {marks.length > 0 &&
          marks.map((mark) => (
            <li className="marks__item" key={Math.random()}>
              <MarkItem showCheckBox={from === 'card'} showPensil mark={mark} />
            </li>
          ))}
      </ul>
      <button type="button" className="marks__create-mark" onClick={handleCreateMark}>
        Создать новую метку
      </button>
      {isOpenModal && (
        <MarkEditModal
          mark={null}
          typeAction={typeAction}
          setIsOpenModal={setIsOpenModal}
          setMarks={setMarks}
          boardId={boardId}
        >
          <button type="submit" className="marks__btn">
            Создать
          </button>
        </MarkEditModal>
      )}
    </div>
  );
}

export default Marks;
