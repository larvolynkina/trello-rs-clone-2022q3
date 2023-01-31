import './column.scss';

type ColumnProps = {
  column: string;
  cards: string[];
};
function Column({ column, cards }: ColumnProps) {
  return (
    <li className="column">
      <div className="column__header">
        <textarea className="column__title" maxLength={512}>{`Колонка ${column}`}</textarea>

        <button className="column__actions" type="button">
          ...
        </button>
      </div>
      <ul className="column__cards">
        {cards.map((card) => (
          <li>{card}</li>
        ))}
      </ul>
      <div className="column__footer">
        <button className="column__add" type="button">
          + Добавить карточку
        </button>
        <button className="column__create" type="button">
          *
        </button>
      </div>
    </li>
  );
}

export default Column;
