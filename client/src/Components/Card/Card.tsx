import { useParams } from 'react-router-dom';
import Title from './Title';
import Description from './Description';
import Participants from './Participants';
import BoardParticipantsModal from '../BoardParticipantsModal';
import AsideList from './AsideList';
import { asideAddButtons, asideActionButtons } from './helpers';
import { useGetCardByIdQuery } from '../../store/reducers/cards/cards.api';
import './Card.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setBoardParticipantsModalOpen } from '../../store/reducers/cards/cardSlice';
import CheckListModal from './CheckListModal';
import CheckListFullList from './CheckListFullList';
import AttachModal from './AttachModal';
import { ParamTypes } from '../../types/card';
import Loader from '../Loader';

function Card() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const { data, isLoading } = useGetCardByIdQuery({ boardId, cardId });
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);
  const attachModalActive = useAppSelector((state) => state.CARD.attachModalActive);

  function openBoardParticipantsModal() {
    setTimeout(() => {
      dispatch(setBoardParticipantsModalOpen());
    }, 0);
  }

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} column={data.column} />
          <div className="card__wrapper">
            <div className="card__main">
              <Participants
                onClick={() => openBoardParticipantsModal()}
                cardParticipants={data.card.participants}
              />
              <Description description={data.card.description} boardId={boardId} cardId={cardId} />
              <CheckListFullList items={data.card.checklists} />
            </div>
            <aside className="card__aside">
              <AsideList title="Добавить на карточку" buttons={asideAddButtons} />
              <AsideList title="Действия" buttons={asideActionButtons} />
            </aside>
          </div>
        </div>
      )}
      {boardParticipantsModalActive && (
        <div className="card__board-participants-modal">
          <BoardParticipantsModal boardId={boardId} cardParticipants={data?.card.participants || []} />
        </div>
      )}
      {checkListModalActive && <CheckListModal />}
      {attachModalActive && <AttachModal />}
    </>
  );
}

export default Card;
