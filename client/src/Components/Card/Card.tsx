import React from 'react';
import { useParams } from 'react-router-dom';
import Title from './Title/Title';
import Description from './Description/Description';
import Participants from './Participants/Participants';
import { useGetCardByIdQuery } from '../../store/reducers/cards/cards.api';
import './Card.scss';

type ParamTypes = {
  boardId: string;
  cardId: string;
};

function Card() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const { data } = useGetCardByIdQuery({ boardId, cardId });

  return (
    <>
      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} />
          <p>в колонке {data.column}</p>
          <Participants participants={data.card.participants} />
          <Description description={data.card.description} boardId={boardId} cardId={cardId} />
        </div>
      )}
      <div>1</div>
    </>
  );
}

export default Card;
