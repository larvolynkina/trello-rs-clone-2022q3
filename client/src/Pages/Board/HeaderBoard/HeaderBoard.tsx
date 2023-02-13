import './headerBoard.scss';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import {
  useUpdateBoardTitleMutation,
  useGetBoardParticipantsQuery,
} from '../../../store/reducers/board/board.api';
import { IBoard } from '../../../types/board';
import UserAvatar from '../../../Components/UserAvatar';
import { IUser } from '../../../types/card';

type HeaderBoardType = {
  boardDetails: IBoard;
  setIsShowSearchForm: (b: boolean)  => void;
};

function HeaderBoard({ boardDetails, setIsShowSearchForm }: HeaderBoardType) {
  const boardInputTitle = useRef<HTMLInputElement>(null);
  const { data: participantsData } = useGetBoardParticipantsQuery({ boardId: boardDetails._id });
  const [updateBoardTitle, { isError: errorUpdateBoardTitle }] = useUpdateBoardTitleMutation();
  const [titleBoardText, setTitleBoardText] = useState('');
  const [isUpdateTitleBoard, setIsUpdateTitleBoard] = useState(false);
  const [participants, setParticipants] = useState<IUser[] | []>([]);

  useEffect(() => {
    if (boardDetails) {
      setTitleBoardText(boardDetails.title);
    }
  }, [boardDetails]);

  useEffect(() => {
    if (participantsData) {
      setParticipants(participantsData);
    }
  }, [participantsData]);

  const handleClickTitle = () => {
    setIsUpdateTitleBoard(true);
    if (boardInputTitle.current) {
      boardInputTitle.current.focus();
    }
  };

  const changeTitleBoard = () => {
    async function asyncUpdateBoardTitle({
      boardIdforUpdate,
      titleforUpdate,
    }: {
      boardIdforUpdate: string;
      titleforUpdate: string;
    }) {
      await updateBoardTitle({ boardId: boardIdforUpdate, title: titleforUpdate });
    }
    setIsUpdateTitleBoard(false);
    if (titleBoardText.trim() !== '' && titleBoardText.trim() !== boardDetails.title) {
      asyncUpdateBoardTitle({ boardIdforUpdate: boardDetails._id, titleforUpdate: titleBoardText });
      if (errorUpdateBoardTitle) throw new Error('Ошибка обновления названия доски');
    }
  };
  const handleKeyDownChangeTitleBoard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeTitleBoard();
      setIsUpdateTitleBoard(false);
    }
    if (e.key === 'Escape') {
      setIsUpdateTitleBoard(false);
    }
  };
  

  return (
    <div className="board__header">
      <div className="board__title">
        <h1
          className="board__title-text"
          onClick={handleClickTitle}
          onKeyUp={handleClickTitle}
          aria-hidden="true"
        >
          {titleBoardText}
        </h1>
        <input
          ref={boardInputTitle}
          type="text"
          className={`board__title-input ${
            isUpdateTitleBoard ? 'board__title-input--is-edit' : ''
          }`}
          value={titleBoardText}
          onChange={(e) => setTitleBoardText(e.target.value)}
          onBlur={() => changeTitleBoard()}
          onKeyDown={handleKeyDownChangeTitleBoard}
          onFocus={(e) => {
            e.target.select();
          }}
        />
      </div>
      <div className="board__participants">
        {participants.map((participant) => (
          <UserAvatar participant={participant} key={participant._id} />
        ))}
      </div>
      <button type="button" className="board__share" onClick={() => setIsShowSearchForm(true)}>
        Добавить участника
      </button>
      <button type="button" className="board__menu">
        ...
      </button>
      
    </div>
  );
}

export default HeaderBoard;
