import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Title from './Title';
import Description from './Description';
import Participants from './Participants';
import BoardParticipantsModal from '../BoardParticipantsModal';
import AsideList from './AsideList';
import { asideAddButtons, asideActionButtons } from './helpers';
import { useGetCardByIdQuery } from '../../store/reducers/cards/cards.api';
import './Card.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setBoardParticipantsModalOpen, setCard } from '../../store/reducers/cards/cardSlice';
import CheckListModal from './CheckListModal';
import CheckListFullList from './CheckListFullList';
import AttachModal from './AttachModal';
import Loader from '../Loader';

type CardProps = {
  boardId: string;
  cardId: string;
  setOpenCard: Dispatch<SetStateAction<{ isOpen: boolean; canOpen: boolean; cardId: string }>>;
};

function Card({ boardId, cardId, setOpenCard }: CardProps) {
  const { data, isLoading } = useGetCardByIdQuery({ boardId, cardId });
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);
  const [searchParams, setSearchParams] = useSearchParams();
  const attachModalActive = useAppSelector((state) => state.CARD.attachModalActive);
  const card = useAppSelector((state) => state.CARD.card);

  function openBoardParticipantsModal() {
    setTimeout(() => {
      dispatch(setBoardParticipantsModalOpen());
    }, 0);
  }

  function closeCard() {
    setOpenCard((prev) => ({ ...prev, isOpen: false }));
    searchParams.delete('card');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (data) {
      dispatch(setCard(data.card));
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      {data && card && (
        <div className="card">
          <button type="button" onClick={closeCard}>
            Закрыть карточку
          </button>
          <Title title={card.title} boardId={boardId} cardId={cardId} column={data.column} />
          <div className="card__wrapper">
            <div className="card__main">
              <Participants
                onClick={() => openBoardParticipantsModal()}
                cardParticipants={card.participants}
              />
              <Description description={card.description} boardId={boardId} cardId={cardId} />
              <CheckListFullList items={card.checklists} boardId={boardId} cardId={cardId} />
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
            boardId={boardId}
            cardId={cardId}
            cardParticipants={card?.participants || []}
          />
        </div>
      )}
      {checkListModalActive && <CheckListModal boardId={boardId} cardId={cardId} />}
      {attachModalActive && <AttachModal />}
    </>
  );
}

export default Card;
