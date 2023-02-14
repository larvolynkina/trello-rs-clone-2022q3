import { useParams } from 'react-router-dom';
import Title from './Title';
import Description from './Description';
import Participants from './Participants';
import BoardParticipantsModal from '../BoardParticipantsModal';
import AsideList from './AsideList';
import { asideAddButtons, asideActionButtons } from './helpers';
import {
  useGetCardByIdQuery,
  useGetCardParticipantsQuery,
} from '../../store/reducers/cards/cards.api';
import { useGetBoardParticipantsQuery } from '../../store/reducers/board/board.api';
import './Card.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setBoardParticipantsModalOpen } from '../../store/reducers/cards/cardSlice';
import CheckListModal from './CheckListModal';
import CheckListFullList from './CheckListFullList';
import { ParamTypes } from '../../types/card';
import Loader from '../Loader';

function Card() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const { data, isLoading } = useGetCardByIdQuery({ boardId, cardId });
  const { data: cardParticipants, isLoading: cardParticipantsLoading } =
    useGetCardParticipantsQuery({ boardId, cardId });
  const { data: boardParticipants, isLoading: boardParticipantsLoading } =
    useGetBoardParticipantsQuery({ boardId });
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);

  function openBoardParticipantsModal() {
    setTimeout(() => {
      dispatch(setBoardParticipantsModalOpen());
    }, 0);
  }

  return (
    <>
      {(cardParticipantsLoading || boardParticipantsLoading || isLoading) && <Loader />}

      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} column={data.column} />
          <div className="card__wrapper">
            <div className="card__main">
              {cardParticipants && cardParticipants.length > 0 && (
                <Participants
                  participants={cardParticipants}
                  onClick={() => openBoardParticipantsModal()}
                />
              )}
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
          <BoardParticipantsModal
            boardParticipants={boardParticipants || []}
            cardParticipantsId={data?.card.participants || []}
          />
        </div>
      )}
      {checkListModalActive && <CheckListModal />}
    </>
  );
}

export default Card;
