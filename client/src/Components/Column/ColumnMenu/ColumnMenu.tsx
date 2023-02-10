import './columnMenu.scss';
import { useDeleteColumnMutation } from '../../../store/reducers/board/board.api';

type ColumnMenuProps = {
  onClose: () => void;
  idOpenedColumn: {boardId: string, columnId: string};
};
function ColumnMenu({ onClose, idOpenedColumn }: ColumnMenuProps) {
  const [deleteColumn, { isError: errorDeleteColumn }] = useDeleteColumnMutation();

  async function asyncDelColumn(idObj: {boardId: string, columnId: string}) {
    await deleteColumn(idObj);
    if (errorDeleteColumn) throw new Error('Ошибка удаления списка');
  }

  const handleDeleteColumn = () => {
    asyncDelColumn(idOpenedColumn);
  };

  return (
    <ul className="column-menu">
      <div className="column-menu__header">
        <p className="column-menu__label">Действия со списком</p>
        <button type="button" className="column-menu__close" onClick={() => onClose()}>
          <span className="column-menu__cross-btn" />
        </button>
      </div>
      <ul className="column-menu__group">
        <li className="column-menu__item">Добавить карточку...</li>
        <li className="column-menu__item">Копировать список...</li>
        <li className="column-menu__item">Переместить список...</li>
      </ul>
      <ul className="column-menu__group">
        <li className="column-menu__item">Переместить все карточки списка...</li>
        <li className="column-menu__item">Архивировать все карточки списка...</li>
      </ul>
      <ul className="column-menu__group">
        <li className="column-menu__item column-menu__item--del">
          <button className="column-menu__button" type="button" onClick={handleDeleteColumn}>
            Удалить список
          </button>
        </li>
      </ul>
    </ul>
  );
}

export default ColumnMenu;
