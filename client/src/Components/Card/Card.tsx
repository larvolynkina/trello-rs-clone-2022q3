import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from './Title/Title';
import Description from './Description/Description';
import Participants from './Participants/Participants';
import ParticipantModal from './ParticipantModal/ParticipantModal';
import {
  useGetCardByIdQuery,
  useGetCardParticipantsQuery,
} from '../../store/reducers/cards/cards.api';
import { useGetBoardParticipantsQuery } from '../../store/reducers/board/board.api';
import './Card.scss';

type ParamTypes = {
  boardId: string;
  cardId: string;
};

function Card() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const { data } = useGetCardByIdQuery({ boardId, cardId });
  const { data: cardParticipants } = useGetCardParticipantsQuery({ boardId, cardId });
  const { data: boardParticipants } = useGetBoardParticipantsQuery({ boardId });

  const [addParticipantModalOpen] = useState(true);

  return (
    <>
      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} column={data.column} />
          {cardParticipants && cardParticipants.length > 0 && (
            <Participants participants={cardParticipants} />
          )}
          <Description description={data.card.description} boardId={boardId} cardId={cardId} />
        </div>
      )}
      {addParticipantModalOpen && (
        <ParticipantModal
          boardParticipants={boardParticipants || []}
          cardParticipantsId={data?.card.participants || []}
        />
      )}
    </>
  );
}

export default Card;
