import './columnMenu.scss';

type ColumnMenuProps = {
  onClose: () => void;
};
function ColumnMenu({ onClose }: ColumnMenuProps) {
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
        <li className="column-menu__item">Архивировать список</li>
      </ul>
    </ul>
  );
}

export default ColumnMenu;
