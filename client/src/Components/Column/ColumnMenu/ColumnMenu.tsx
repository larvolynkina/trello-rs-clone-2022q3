import './columnMenu.scss';
import { toast } from 'react-toastify';

import {
  useDeleteColumnMutation,
  useCopyColumnMutation,
} from '../../../store/reducers/board/board.api';
import {
  deleteColumnFromStore,
  createColumnInStore,
  addFewCardsInColumn,
} from '../../../store/reducers/board/boardState';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type ColumnMenuProps = {
  onClose: () => void;
  idOpenedColumn: { boardId: string; columnId: string };
  setAddCardFromMenu: (b: boolean) => void;
};
function ColumnMenu({ onClose, idOpenedColumn, setAddCardFromMenu }: ColumnMenuProps) {
  const [deleteColumn, { isError: errorDeleteColumn }] = useDeleteColumnMutation();
  const [copyColumn] = useCopyColumnMutation();
  const { columnsData } = useAppSelector((state) => state.BOARD);
  const dispatch = useAppDispatch();

  async function asyncDelColumn(idObj: { boardId: string; columnId: string }) {
    await deleteColumn(idObj);
    if (errorDeleteColumn) throw new Error('Ошибка удаления списка');
  }

  const handleDeleteColumn = () => {
    dispatch(deleteColumnFromStore({ columnId: idOpenedColumn.columnId }));
    asyncDelColumn(idOpenedColumn);
  };
  const handleAddCard = () => {
    setAddCardFromMenu(true);
  };
  const handleCopyCard = () => {
    const currentColumn = columnsData.find((column) => column._id === idOpenedColumn.columnId);
    toast.loading('Добавляем копию колонки...');
    copyColumn({
      boardId: idOpenedColumn.boardId,
      columnId: idOpenedColumn.columnId,
      newTitle: `Копия колонки ${currentColumn?.title}`,
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        toast.dismiss();
        if (res && res.column._id.length > 0) {
          dispatch(createColumnInStore({ column: res.column, boardId: idOpenedColumn.boardId }));
          dispatch(addFewCardsInColumn(res.cards))
        }
      });
  };

  return (
    <ul className="column-menu">
      <div className="column-menu__header">
        <p className="column-menu__label">Действия с колонкой</p>
        <button type="button" className="column-menu__close" onClick={() => onClose()}>
          <span className="column-menu__cross-btn" />
        </button>
      </div>
      <ul className="column-menu__group">
        <li className="column-menu__item">
          <button className="column-menu__button" type="button" onClick={handleAddCard}>
            Добавить карточку...
          </button>
        </li>
        <li className="column-menu__item">
          <button className="column-menu__button" type="button" onClick={handleCopyCard}>
            Копировать колонку...
          </button>
        </li>
      </ul>
      <ul className="column-menu__group">
        <li className="column-menu__item column-menu__item--del">
          <button className="column-menu__button" type="button" onClick={handleDeleteColumn}>
            Удалить колонку
          </button>
        </li>
      </ul>
    </ul>
  );
}

export default ColumnMenu;
