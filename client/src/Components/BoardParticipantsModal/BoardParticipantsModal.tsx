import { useDetectClickOutside } from 'react-detect-click-outside';
import BoardsParticipant from './BoardsParticipant';
import { useAppDispatch } from '../../hooks/redux';
import { setBoardParticipantsModalClose } from '../../store/reducers/cards/cardSlice';
import { useGetBoardParticipantsQuery } from '../../store/reducers/board/board.api';
import { IUser } from '../../types/card';
import './BoardParticipantsModal.scss';
import Loader from '../Loader';

interface ParticipantModalProps {
  boardId: string;
  cardParticipants: IUser[];
}

function BoardParticipantsModal({ boardId, cardParticipants }: ParticipantModalProps) {
  const dispatch = useAppDispatch();
  const {
    data: boardParticipants,
    isLoading,
    isSuccess,
  } = useGetBoardParticipantsQuery({ boardId });

  function onClickCloseHandler() {
    dispatch(setBoardParticipantsModalClose());
  }
  const ref = useDetectClickOutside({ onTriggered: onClickCloseHandler });

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
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
            {boardParticipants?.map((participant) => (
              <BoardsParticipant
                participant={participant}
                key={participant._id}
                cardParticipantsId={cardParticipants.map((user) => user._id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BoardParticipantsModal;
