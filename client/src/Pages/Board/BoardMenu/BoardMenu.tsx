import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IBoard } from '../../../types/board';
import './boardMenu.scss';

import {
  useUpdateBoardBackgroundMutation,
  useLeaveBoardParticipantsMutation,
  useDeleteBoardMutation,
} from '../../../store/reducers/board/board.api';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  updateBoardBgInStore,
  updateBoardDetails,
  updateParticipantsInStore,
} from '../../../store/reducers/board/boardState';
import { APPRoute, BG_COLORS, BG_IMAGES } from '../../../const/const';
import Marks from '../../../Components/Marks';
import Activity from '../../../Components/Activities';
import { IWorkspace, IWsBoard } from '../../../types/workspace';
import { workspaceApi } from '../../../store/reducers/workspace/workspace.api';

type BoardMenuProps = {
  setIsShowBoardMenu: (b: boolean) => void;
  boardDetails: IBoard;
  setBgStyle: ({
    backgroundColor,
    backgroundImage,
  }: {
    backgroundColor?: string;
    backgroundImage?: string;
  }) => void;
};

type TStateComponentView = {
  state: 'base' | 'changeBg' | 'bgImage' | 'bgColor' | 'marks';
};

function BoardMenu({ setIsShowBoardMenu, boardDetails, setBgStyle }: BoardMenuProps) {
  const dispatch = useAppDispatch();
  const [currentBg, setCurrentBg] = useState({});
  const [updateBoardBackground] = useUpdateBoardBackgroundMutation();
  const [leaveBoardParticipants] = useLeaveBoardParticipantsMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [stateComponentView, setStateComponentView] = useState<TStateComponentView>({
    state: 'base',
  });
  const [titleHeader, setTitleHeader] = useState('Меню');
  const [myRole, setMyRole] = useState<'participant' | 'owner' | 'guest'>('guest');
  const { userData } = useAppSelector((state) => state.USER);
  const { participantsData } = useAppSelector((state) => state.BOARD);
  const navigate = useNavigate();

  useEffect(() => {
    if (boardDetails.backgroundImage && boardDetails.backgroundImage.length > 0) {
      setCurrentBg({
        backgroundImage: boardDetails.backgroundImage,
      });
    } else if (boardDetails.backgroundColor && boardDetails.backgroundColor.length > 0) {
      setCurrentBg({
        backgroundColor: boardDetails.backgroundColor,
      });
    }
  }, [boardDetails]);

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
  }, [userData, boardDetails]);

  useEffect(() => {
    switch (stateComponentView.state) {
      case 'base':
        setTitleHeader('Меню');
        break;
      case 'changeBg':
        setTitleHeader('Смена фона');
        break;
      case 'bgImage':
        setTitleHeader('Фотографии');
        break;
      case 'bgColor':
        setTitleHeader('Цвета');
        break;
      case 'marks':
        setTitleHeader('Метки');
        break;
      default:
        setTitleHeader('Меню');
        break;
    }
  }, [stateComponentView]);

  const handleClickBtnChangeBg = () => {
    setStateComponentView({ state: 'changeBg' });
  };

  const handleClickBtnMarks = () => {
    setStateComponentView({ state: 'marks' });
  };

  const handleClickBack = () => {
    switch (stateComponentView.state) {
      case 'changeBg':
        setStateComponentView({ state: 'base' });
        break;
      case 'bgImage':
        setStateComponentView({ state: 'changeBg' });
        break;
      case 'bgColor':
        setStateComponentView({ state: 'changeBg' });
        break;
      case 'marks':
        setStateComponentView({ state: 'base' });
        break;
      default:
        setStateComponentView({ state: 'base' });
        break;
    }
  };

  const handleClickBtnBgImage = () => {
    setStateComponentView({ state: 'bgImage' });
  };
  const handleClickBtnBgColor = () => {
    setStateComponentView({ state: 'bgColor' });
  };

  const handleClickColor = (index: number) => {
    const style = {
      backgroundColor: BG_COLORS[index],
      backgroundImage: '',
    };
    setBgStyle(style);
    const newBoards: IWsBoard[] = [];
    if (boardDetails.workspace) {
      boardDetails.workspace.boards.forEach((board) => {
        if (board._id === boardDetails._id) {
          newBoards.push({ ...board, backgroundColor: BG_COLORS[index], backgroundImage: '' });
        } else {
          newBoards.push(board);
        }
      });
      const newWorkspace: IWorkspace = { ...boardDetails.workspace, boards: newBoards };
      dispatch(
        updateBoardDetails({
          ...boardDetails,
          workspace: newWorkspace,
        }),
      );
    }
    dispatch(updateBoardBgInStore(style));
    dispatch(workspaceApi.util.invalidateTags(['Workspace']));

    updateBoardBackground({
      boardId: boardDetails._id,
      backgroundColor: style.backgroundColor,
      backgroundImage: '',
    });
  };

  const handleClickImage = (image: string) => {
    const style = {
      backgroundImage: `url(${image})`,
      backgroundColor: '',
    };
    setBgStyle(style);
    const newBoards: IWsBoard[] = [];
    if (boardDetails.workspace) {
      boardDetails.workspace.boards.forEach((board) => {
        if (board._id === boardDetails._id) {
          newBoards.push({ ...board, backgroundImage: `url(${image})` });
        } else {
          newBoards.push(board);
        }
      });
      const newWorkspace: IWorkspace = { ...boardDetails.workspace, boards: newBoards };
      dispatch(
        updateBoardDetails({
          ...boardDetails,
          workspace: newWorkspace,
        }),
      );
    }
    dispatch(updateBoardBgInStore(style));
    dispatch(workspaceApi.util.invalidateTags(['Workspace']));

    updateBoardBackground({
      boardId: boardDetails._id,
      backgroundColor: '',
      backgroundImage: style.backgroundImage,
    });
  };

  const handleClickBtnQuit = () => {
    if (myRole === 'participant') {
      if (userData) {
        const newParticipants = participantsData.filter((part) => part._id !== userData._id);
        if (newParticipants) {
          dispatch(updateParticipantsInStore(newParticipants));
        }
      }
      leaveBoardParticipants({ boardId: boardDetails._id });
      toast.success(`Вы больше не являетесь участником доски ${boardDetails.title}`, {
        autoClose: 1500,
      });
    } else if (myRole === 'owner') {
      toast.loading('Удаляем доску...');
      deleteBoard(boardDetails._id).then(() => {
        dispatch(workspaceApi.util.invalidateTags(['Workspace']));

        toast.dismiss();
        navigate(APPRoute.workspaces);
      });
    }
  };

  return (
    <aside className="board-menu">
      <div className="board-menu__header">
        <p className="board-menu__title">{titleHeader}</p>
        {stateComponentView.state !== 'base' && (
          <button className="board-menu__back" type="button" onClick={handleClickBack}>
            <span className="board-menu__back-btn" />
          </button>
        )}
        <button
          type="button"
          className="board-menu__close-btn"
          onClick={() => {
            setIsShowBoardMenu(false);
          }}
        >
          <span className="board-menu__cross-btn" />
        </button>
      </div>
      {stateComponentView.state === 'base' && (
        <>
          <ul className="board-menu__list">
            <li className="board-menu__item">
              <button type="button" className="board-menu__btn" onClick={handleClickBtnChangeBg}>
                <div className="board-menu__icon-bg" style={currentBg} />
                Сменить фон
              </button>
            </li>
            <li className="board-menu__item">
              <button type="button" className="board-menu__btn" onClick={handleClickBtnMarks}>
                <div className="board-menu__icon-mark" />
                Метки
              </button>
            </li>
            <li className="board-menu__item">
              {myRole !== 'guest' && (
                <button
                  type="button"
                  className="board-menu__btn board-menu__btn--quit"
                  onClick={handleClickBtnQuit}
                >
                  <div className="board-menu__icon-quit" />
                  {myRole === 'owner' ? 'Удалить доску' : 'Покинуть доску'}
                </button>
              )}
            </li>
          </ul>
          <div className="board-menu__actions">
            <p className="board-menu__actions-title">Действия</p>
            {boardDetails.activities && <Activity activities={boardDetails.activities} />}
          </div>
        </>
      )}
      {stateComponentView.state === 'changeBg' && (
        <ul className="change-bg">
          <li className="change-bg__list-item">
            <button type="button" className="change-bg__btn" onClick={handleClickBtnBgImage}>
              <div className="change-bg__foto" />
              <p className="change-bg__text">Фотографии</p>
            </button>
          </li>
          <li className="change-bg__list-item">
            <button type="button" className="change-bg__btn" onClick={handleClickBtnBgColor}>
              <div className="change-bg__color" />
              <p className="change-bg__text">Цвета</p>
            </button>
          </li>
        </ul>
      )}
      {stateComponentView.state === 'bgColor' && (
        <ul className="change-bg__colors">
          {BG_COLORS.map((color, index) => (
            <button
              key={Math.random()}
              type="button"
              className="change-bg__btn"
              onClick={() => handleClickColor(index)}
            >
              <li className="change-bg__item" style={{ backgroundColor: color }} />
            </button>
          ))}
        </ul>
      )}
      {stateComponentView.state === 'bgImage' && (
        <ul className="change-bg__images">
          {BG_IMAGES.map((image) => (
            <button
              key={Math.random()}
              type="button"
              className="change-bg__btn"
              onClick={() => handleClickImage(image)}
            >
              <li className="change-bg__item" style={{ backgroundImage: `url(${image})` }} />
            </button>
          ))}
        </ul>
      )}
      {stateComponentView.state === 'marks' && boardDetails.marks && (
        <Marks from="menu" boardId={boardDetails._id} />
      )}
    </aside>
  );
}

export default BoardMenu;
