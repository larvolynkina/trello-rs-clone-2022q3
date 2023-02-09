import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from './Title/Title';
import Description from './Description/Description';
import Participants from './Participants/Participants';
import ParticipantModal from './ParticipantModal/ParticipantModal';
import {
  useGetCardByIdQuery,
  useGetCardParticipantsQuery,
  useGetBoardParticipantsQuery,
} from '../../store/reducers/cards/cards.api';
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

  const [addParticipantModalOpen] = useState(false);

  return (
    <>
      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} column={data.column} />
          <Participants participants={cardParticipants || []} />
          <Description description={data.card.description} boardId={boardId} cardId={cardId} />
        </div>
      )}
      {
        addParticipantModalOpen && <ParticipantModal participants={boardParticipants || []} />
      }
    </>
  );
}

export default Card;
