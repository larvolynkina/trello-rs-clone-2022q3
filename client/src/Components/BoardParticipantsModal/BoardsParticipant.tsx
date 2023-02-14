/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAddCardParticipantMutation,
  useDeleteCardParticipantMutation,
} from '../../store/reducers/cards/cards.api';
import { IUser } from '../../types/card';
import Avatar from '../UserAvatar/UserAvatar';
import Loader from '../Loader';


interface BoardsParticipantProps {
  participant: IUser;
  cardParticipantsId: string[];
}

type ParamTypes = {
  boardId: string;
  cardId: string;
};

function BoardsParticipant({ participant, cardParticipantsId }: BoardsParticipantProps) {
  const { boardId, cardId } = useParams() as ParamTypes;
  const [active, setActive] = useState(false);
  const [addCardParticipant, { isLoading: adding }] = useAddCardParticipantMutation();
  const [deleteCardParticipant, { isLoading: deleting }] = useDeleteCardParticipantMutation();

  function onClickHandler() {
    if (!active) {
      addCardParticipant({ boardId, cardId, participantId: participant._id });
    } else {
      deleteCardParticipant({ boardId, cardId, participantId: participant._id });
      setActive(false);
    }
  }

  useEffect(() => {
    if (cardParticipantsId.length > 0) {
      if (cardParticipantsId.includes(participant._id)) {
        setActive(true);
      }
    }
  }, [cardParticipantsId]);

  return (
    <>
      {(adding || deleting) && <Loader />}
      <div
        className={
          active
            ? 'board-participants-modal__participant board-participants-modal__participant--active'
            : 'board-participants-modal__participant'
        }
        onClick={onClickHandler}
      >
        <Avatar participant={participant} />
        <div>{participant.userName}</div>
      </div>
    </>
  );
}

export default BoardsParticipant;
