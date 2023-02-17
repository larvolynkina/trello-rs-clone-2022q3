/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import {
  useAddCardParticipantMutation,
  useDeleteCardParticipantMutation,
} from '../../store/reducers/cards/cards.api';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { addParticipant, deleteParticipant } from '../../store/reducers/cards/cardSlice';
import { IUser } from '../../types/card';
import Avatar from '../UserAvatar/UserAvatar';
import Loader from '../Loader';

interface BoardsParticipantProps {
  participant: IUser;
  cardParticipantsId: string[];
  boardId: string;
  cardId: string;
}

function BoardsParticipant({
  participant,
  cardParticipantsId,
  boardId,
  cardId,
}: BoardsParticipantProps) {
  const [active, setActive] = useState(false);
  const [addCardParticipant, { isLoading: adding }] = useAddCardParticipantMutation();
  const [deleteCardParticipant, { isLoading: deleting }] = useDeleteCardParticipantMutation();
  const card = useAppSelector((state) => state.CARD.card);
  const dispatch = useAppDispatch();

  function onClickHandler() {
    if (!adding && !deleting) {
      if (!active) {
        setActive(true);
        if (card) {
          dispatch(addParticipant(participant));
          addCardParticipant({ boardId, cardId, participantId: participant._id });
        }
      } else {
        setActive(false);
        if (card) {
          dispatch(deleteParticipant(participant._id));
          deleteCardParticipant({ boardId, cardId, participantId: participant._id });
        }
      }
    }
  }

  useEffect(() => {
    if (cardParticipantsId.length > 0) {
      if (cardParticipantsId.includes(participant._id)) {
        setActive(true);
      }
    }
  }, []);

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
