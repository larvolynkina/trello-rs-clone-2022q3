import { useEffect, useState } from 'react';
import { IAttachment } from '../../../types/card';
import { SERVER_URL } from '../../../const/const';
import {
  useDeleteAttachmentMutation,
  useDeleteFileMutation,
} from '../../../store/reducers/cards/cards.api';
import { deleteAttachmentFromState } from '../../../store/reducers/cards/cardSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateCardInStore } from '../../../store/reducers/board/boardState';

interface AttachmentProps {
  boardId: string;
  cardId: string;
  attachment: IAttachment;
  id: string;
}

function Attachment({ boardId, cardId, attachment, id }: AttachmentProps) {
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');
  const [deleteAttachment] = useDeleteAttachmentMutation();
  const [deleteFile] = useDeleteFileMutation();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const { cardsData } = useAppSelector((state) => state.BOARD);

  function deleteAttachmentHandler() {
    const foundCard = cardsData.find((card) => card._id === cardId);
    if (foundCard) {
      const newAttachments = foundCard.attachments.filter((attach) => attach._id !== attachment._id);
      dispatch(updateCardInStore({card: {...foundCard, attachments: newAttachments}}));
    }
    dispatch(deleteAttachmentFromState({ id }));
    deleteAttachment({ boardId, cardId, id });
    deleteFile(attachment.url);
  }

  useEffect(() => {
    const day = new Date(attachment.date).toLocaleDateString();
    setDate(day);
    if (attachment.type === 'link') {
      setLabel('LINK');
      setLink(attachment.url);
      setTitle(attachment.url);
    } else {
      setLabel(attachment.name.split('.').at(-1)?.toUpperCase() || '');
      setLink(`${SERVER_URL}${attachment.url}`);
      setTitle(attachment.name);
    }
  }, [attachment]);

  return (
    <div className="card__attachment">
      <a className="card__attachment-label" target="_blank" href={link} rel="noreferrer">
        {label}
      </a>
      <div className="card__attachment-info">
        <div className="card__attachment-link-container">
          <a
            className="card__attachment-link"
            target="_blank"
            href={link}
            rel="noreferrer"
            title={title}
          >
            {attachment.name}
          </a>
          <p>{`Добавлено ${date}`}</p>
        </div>
        <button
          className="card__attachment-delete-btn checklist__btn"
          type="button"
          onClick={deleteAttachmentHandler}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default Attachment;
