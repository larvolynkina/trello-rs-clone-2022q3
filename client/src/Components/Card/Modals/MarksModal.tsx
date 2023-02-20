import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch } from '../../../hooks/redux';
import { setMarksModalClose } from '../../../store/reducers/cards/cardSlice';
import Marks from '../../Marks';

interface MarksModalProps {
  from: 'card';
  boardId: string;
  cardId: string;
  cardMarks: string[];
}

function MarksModal({ from, boardId, cardId, cardMarks }: MarksModalProps) {
  const dispatch = useAppDispatch();
  const ref = useDetectClickOutside({
    onTriggered: (event: Event) => {
      const target = event.target as HTMLElement;
      if (
        !target.classList.contains('mark-item__checkbox') &&
        !target.classList.contains('marks__btn--del')
      ) {
        dispatch(setMarksModalClose());
      }
    },
  });

  return (
    <div className="card__modal" ref={ref}>
      <h3>Метки</h3>
      <button
        className="card__modal-close"
        type="button"
        aria-label="close modal"
        onClick={() => dispatch(setMarksModalClose())}
      />
      <Marks boardId={boardId} cardId={cardId} cardMarks={cardMarks} from={from} />
    </div>
  );
}

export default MarksModal;
