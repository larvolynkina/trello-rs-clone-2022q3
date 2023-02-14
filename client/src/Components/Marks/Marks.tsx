import './marks.scss';
import { useEffect, useState } from 'react';
import { IMark } from '../../types/card';
import { useGetBoardByIDQuery } from '../../store/reducers/board/board.api';
import MarkItem from './MarkItem';

type MarksProps = {
  from: 'menu' | 'card';
  // marksData?: IMark[];
  boardId: string;
};

function Marks({ from, boardId }: MarksProps) {
  const { data: boardData } = useGetBoardByIDQuery(boardId);
  const [marks, setMarks] = useState<IMark[] | []>([]);

  useEffect(() => {
    if (boardData) {
      setMarks(boardData.marks);
    }
  }, []);

  return (
    <div className="marks">
      {from === 'card' && (
        <div className="marks__header">
          <p className="marks__title">Метки</p>
          <button type="button" className="marks__close-btn">
            <span className="marks__cross-btn" />
          </button>
        </div>
      )}
      <ul className="marks__list">
        {marks.length > 0 && marks.map((mark) => 
          <li className="marks__item" key={Math.random()}>
            <MarkItem showCheckBox={from === 'card'} mark={mark}/>
          </li>
        )}
      </ul>
    </div>
  );
}

// Marks.defaultProps = {
//   marksData: [],
// };

export default Marks;
