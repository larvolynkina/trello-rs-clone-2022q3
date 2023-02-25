import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Title from './Title';
import Description from './Description';
import Participants from './Participants';
import BoardParticipantsModal from '../BoardParticipantsModal';
import AsideList from './Aside/AsideList';
import { asideAddButtons, asideActionButtons } from './helpers';
import { useGetCardByIdQuery } from '../../store/reducers/cards/cards.api';
import './Card.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  setBoardParticipantsModalOpen,
  setCard,
  resetCard,
} from '../../store/reducers/cards/cardSlice';
import CheckListModal from './Modals/CheckListModal';
import CheckListFullList from './CheckList/CheckListFullList';
import AttachModal from './Modals/AttachModal';
import Loader from '../Loader';
import AttachmentsList from './Attachments/AttachmentsList';
import ActivitiesList from '../Activities';
import MarksModal from './Modals/MarksModal';
import MarksList from './Marks/MarksList';

type CardProps = {
  boardId: string;
  cardId: string;
  setOpenCard: Dispatch<SetStateAction<{ isOpen: boolean; canOpen: boolean; cardId: string }>>;
};

function Card({ boardId, cardId, setOpenCard }: CardProps) {
  const { data, isLoading, refetch } = useGetCardByIdQuery({ boardId, cardId });
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);
  const [searchParams, setSearchParams] = useSearchParams();
  const attachModalActive = useAppSelector((state) => state.CARD.attachModalActive);
  const marksModalActive = useAppSelector((state) => state.CARD.marksModalActive);
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
    dispatch(resetCard());

  }

  useEffect(() => {
    if (data) {
      dispatch(setCard(data));
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      {data && card && (
        <div className="card">
          <button
            className="card__close"
            type="button"
            aria-label="close card"
            onClick={() => {
              closeCard();
              refetch();
            }}
          />
          <Title title={card.title} boardId={boardId} cardId={cardId} column={card.column} />
          <div className="card__wrapper">
            <div className="card__main">
              <Participants
                onClick={() => openBoardParticipantsModal()}
                cardParticipants={card.participants}
              />
              {card.marks.length > 0 && (
                <MarksList boardId={boardId} cardId={cardId} marksId={card.marks} />
              )}
              <Description description={card.description} boardId={boardId} cardId={cardId} />
              {card.attachments.length > 0 && (
                <AttachmentsList boardId={boardId} cardId={cardId} attachments={card.attachments} />
              )}
              <CheckListFullList items={card.checklists} boardId={boardId} cardId={cardId} />
              <div className="card__activities">
                <ActivitiesList activities={card.activities} />
              </div>
            </div>
            <aside className="card__aside">
              <AsideList
                title="Добавить на карточку"
                buttons={asideAddButtons}
                boardId={boardId}
                cardId={cardId}
              />
              <AsideList
                title="Действия"
                buttons={asideActionButtons}
                boardId={boardId}
                cardId={cardId}
                closeCard={() => closeCard()}
              />
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
      {attachModalActive && <AttachModal boardId={boardId} cardId={cardId} />}
      {marksModalActive && (
        <MarksModal boardId={boardId} cardId={cardId} cardMarks={card?.marks || []} from="card" />
      )}
    </>
  );
}

export default Card;
