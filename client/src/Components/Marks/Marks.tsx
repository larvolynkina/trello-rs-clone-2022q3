import './marks.scss';
import { useEffect, useState } from 'react';
import { IMark } from '../../types/board';
import MarkItem from './MarkItem';
import MarkHeader from './MarkHeader';
import MarkEditModal from './MarkEditModal';
import { useAppSelector } from '../../hooks/redux';

type MarksProps = {
  from: 'menu' | 'card' | 'cardMenu';
  boardId: string;
  cardId?: string;
  cardMarks?: string[];
};

function Marks({ from, boardId, cardId, cardMarks }: MarksProps) {
  const marksFromState = useAppSelector(state => state.BOARD.boardData.marks)
  const [marks, setMarks] = useState<IMark[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeAction, setTypeAction] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    if (marksFromState) {
      setMarks(marksFromState);
    }
  }, []);

  const handleCreateMark = () => {
    setIsOpenModal(true);
    setTypeAction('create');
  };
  return (
    <div className="marks">
      {from === 'cardMenu' && <MarkHeader isShow={setIsOpenModal} />}
      <ul className="marks__list">
        {marks.length > 0 &&
          marks.map((mark, index) => (
            <li className="marks__item" key={Math.random()}>
              <MarkItem
                showCheckBox={from === 'card'}
                showPensil
                mark={mark}
                setMarks={setMarks}
                index={index}
                boardId={boardId}
                cardId={cardId}
                cardMarks={cardMarks}
              />
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
          index={-1}
        />
      )}
    </div>
  );
}

Marks.defaultProps = {
  cardMarks: [],
  cardId: undefined,
};

export default Marks;
