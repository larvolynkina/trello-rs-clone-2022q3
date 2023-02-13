import { useDetectClickOutside } from 'react-detect-click-outside';
import BoardsParticipant from './BoardsParticipant';
import { useAppDispatch } from '../../hooks/redux';
import { setBoardParticipantsModalClose } from '../../store/reducers/cards/cardSlice';
import { IUser } from '../../types/card';
import './BoardParticipantsModal.scss';

interface ParticipantModalProps {
  boardParticipants: IUser[];
  cardParticipantsId: string[];
}

function BoardParticipantsModal({ boardParticipants, cardParticipantsId }: ParticipantModalProps) {
  const dispatch = useAppDispatch();

  function onClickCloseHandler() {
    dispatch(setBoardParticipantsModalClose());
  }

  const ref = useDetectClickOutside({ onTriggered: onClickCloseHandler });

  return (
    <div className="board-participants-modal" ref={ref}>
      <h3>Участники</h3>
      <button
        className="board-participants-modal__close"
        type="button"
        aria-label="close modal"
        onClick={onClickCloseHandler}
      />
      <span className="board-participants-modal__line" />
      <p>Участники доски</p>
      <div className="board-participants-modal__list">
        {boardParticipants.map((participant) => (
          <BoardsParticipant
            participant={participant}
            key={participant._id}
            cardParticipantsId={cardParticipantsId}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardParticipantsModal;
