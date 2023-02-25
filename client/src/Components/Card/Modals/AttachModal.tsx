import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setAttachModalClose } from '../../../store/reducers/cards/cardSlice';
import {
  useUploadFileMutation,
  useAddAttachmentMutation,
  TUploadFileResponse,
  TAttachmentDraft,
} from '../../../store/reducers/cards/cards.api';
import { updateCardInStore } from '../../../store/reducers/board/boardState';

interface IAttachModalProps {
  boardId: string;
  cardId: string;
}

function AttachModal({ boardId, cardId }: IAttachModalProps) {
  const dispatch = useAppDispatch();
  const [uploadFile] = useUploadFileMutation();
  const [addAttachment] = useAddAttachmentMutation();
  const [link, setLink] = useState('');

  function onClickCloseHandler() {
    dispatch(setAttachModalClose());
  }

  const ref = useDetectClickOutside({ onTriggered: onClickCloseHandler });
  const fileInput = useRef<HTMLInputElement | null>(null);

  async function inputFileOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (event.target.files) {
        const file = event.target.files[0];
        if (file.size > 10 * 1024 * 1024) {
          toast.error('Размер файла не должен превышать 10 Мегабайт');
          if (fileInput.current) {
            fileInput.current.value = '';
            return;
          }
        }
        const name = encodeURI(file.name);
        const formData = new FormData();
        formData.append('file', file, name);
        const result = (await uploadFile(formData)) as unknown as TUploadFileResponse;
        const data: TAttachmentDraft = {
          type: 'file',
          name: result.data.name,
          url: result.data.url,
        };
        addAttachment({ boardId, cardId, data })
          .unwrap()
          .then((res) => {
            dispatch(updateCardInStore({ card: res }));
          });
        dispatch(setAttachModalClose());
      }
    } catch {
      toast.error('Что-то пошло не так...');
    }
  }

  function addLink() {
    setLink('');
    const data: TAttachmentDraft = {
      type: 'link',
      name: link,
      url: link,
    };
    addAttachment({ boardId, cardId, data })
      .unwrap()
      .then((res) => {
        dispatch(updateCardInStore({ card: res }));
      });
    dispatch(setAttachModalClose());
  }

  return (
    <div className="card__modal card__modal--attach" ref={ref}>
      <h3>Прикрепить</h3>
      <button
        className="card__modal-close"
        type="button"
        aria-label="close modal"
        onClick={onClickCloseHandler}
      />
      <span className="board-participants-modal__line" />
      <p>Загрузить файл с компьютера</p>
      <button
        onClick={() => fileInput.current?.click()}
        className="card__description-btn card__description-btn--save attach-btn"
        type="button"
      >
        Прикрепить файл
      </button>
      <input
        type="file"
        id="file"
        name="file"
        onChange={inputFileOnChangeHandler}
        ref={fileInput}
        hidden
      />
      <span className="board-participants-modal__line" />
      <input
        type="text"
        className="card__modal--attach__input-file"
        value={link}
        placeholder="Введите адрес ссылки"
        onChange={(event) => setLink(event.target.value)}
      />
      <button
        className="card__description-btn card__description-btn--save"
        type="button"
        onClick={addLink}
      >
        Прикрепить ссылку
      </button>
    </div>
  );
}

export default AttachModal;
