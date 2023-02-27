import './headerBoard.scss';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  useGetBoardParticipantsQuery,
  useUpdateBoardTitleMutation,
  useJoinBoardMutation,
} from '../../../store/reducers/board/board.api';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import {
  updateParticipantsInStore,
  updateBoardDetails,
} from '../../../store/reducers/board/boardState';
import { IBoard } from '../../../types/board';
import UserAvatar from '../../../Components/UserAvatar';
import { IUser } from '../../../types/card';
import { IWorkspace, IWsBoard } from '../../../types/workspace';
import { workspaceApi } from '../../../store/reducers/workspace/workspace.api';

type HeaderBoardType = {
  boardDetails: IBoard;
  setIsShowSearchForm: (b: boolean) => void;
  setIsShowBoardMenu: (b: boolean) => void;
};

function HeaderBoard({ boardDetails, setIsShowSearchForm, setIsShowBoardMenu }: HeaderBoardType) {
  const boardInputTitle = useRef<HTMLInputElement>(null);
  const [updateBoardTitle, { isError: errorUpdateBoardTitle }] = useUpdateBoardTitleMutation();
  const { data: participantsDataFromServer } = useGetBoardParticipantsQuery({
    boardId: boardDetails._id,
  });
  const [joinBoard] = useJoinBoardMutation();
  const { participantsData } = useAppSelector((state) => state.BOARD);
  const dispatch = useAppDispatch();

  const [titleBoardText, setTitleBoardText] = useState('');
  const [isUpdateTitleBoard, setIsUpdateTitleBoard] = useState(false);

  const [myRole, setMyRole] = useState<'participant' | 'owner' | 'guest'>('guest');
  const { userData } = useAppSelector((state) => state.USER);

  useEffect(() => {
    if (userData && userData._id.length > 0) {
      if (userData._id === boardDetails.owner) {
        setMyRole('owner');
      } else if (boardDetails.participants?.includes(userData._id)) {
        setMyRole('participant');
      } else {
        setMyRole('guest');
      }
    }
  }, [boardDetails]);

  useEffect(() => {
    if (boardDetails) {
      setTitleBoardText(boardDetails.title);
    }
  }, [boardDetails]);

  useEffect(() => {
    if (participantsDataFromServer) {
      dispatch(updateParticipantsInStore(participantsDataFromServer));
    }
  }, [participantsDataFromServer]);

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
      const newBoards: IWsBoard[] = [];
      if (boardDetails.workspace) {
        boardDetails.workspace.boards.forEach((board) => {
          if (board._id === boardDetails._id) {
            newBoards.push({ ...board, title: titleBoardText.trim() });
          } else {
            newBoards.push(board);
          }
        });
        const newWorkspace: IWorkspace = { ...boardDetails.workspace, boards: newBoards };
        dispatch(
          updateBoardDetails({
            ...boardDetails,
            title: titleBoardText.trim(),
            workspace: newWorkspace,
          }),
        );
        dispatch(workspaceApi.util.invalidateTags(['Workspace']))
      }
      asyncUpdateBoardTitle({
        boardIdforUpdate: boardDetails._id,
        titleforUpdate: titleBoardText.trim(),
      });
      if (errorUpdateBoardTitle) throw new Error('Ошибка обновления названия доски');
    }
    if (titleBoardText.trim() === '') {
      setTitleBoardText(boardDetails.title);
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

  const handleJoinClick = () => {
    if (userData) {
      const newParticipants: IUser[] = [...participantsData, userData];
      if (newParticipants) {
        dispatch(updateParticipantsInStore(newParticipants));
        setMyRole('participant');
        toast.success(`Вы являетесь участником доски ${boardDetails.title}`, { autoClose: 1000 });
      }
      joinBoard({ boardId: boardDetails._id });
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
      {myRole === 'guest' && (
        <button type="button" className="board__join" onClick={handleJoinClick}>
          Присоединиться
        </button>
      )}
      <div className="board__participants">
        {participantsData.map((participant) => (
          <UserAvatar participant={participant} key={participant._id} />
        ))}
      </div>
      <button type="button" className="board__share" onClick={() => setIsShowSearchForm(true)}>
        Добавить участника
      </button>
      <button type="button" className="board__menu" onClick={() => setIsShowBoardMenu(true)}>
        ...
      </button>
    </div>
  );
}

export default HeaderBoard;
