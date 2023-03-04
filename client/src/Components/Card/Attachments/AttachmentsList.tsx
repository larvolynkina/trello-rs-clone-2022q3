import React from 'react';
import { IAttachment } from '../../../types/card';
import Attachment from './Attachment';

interface AttachmentsListProps {
  boardId: string;
  cardId: string;
  attachments: IAttachment[];
}

function AttachmentsList({ boardId, cardId, attachments }: AttachmentsListProps) {
  return (
    <div className="card__attachments">
      <h3>Вложения</h3>
      <span className="card__icon card__icon--attach" />
      {attachments.map((item) => (
        <Attachment
          attachment={item}
          key={item._id}
          id={item._id}
          boardId={boardId}
          cardId={cardId}
        />
      ))}
    </div>
  );
}

export default AttachmentsList;
