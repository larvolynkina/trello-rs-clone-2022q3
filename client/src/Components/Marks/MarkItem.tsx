import { IMark } from '../../types/card';

type MarkItemProps = {
  showCheckBox: boolean;
  showPensil: boolean;
  mark: IMark;
};

function MarkItem({ showCheckBox, showPensil, mark }: MarkItemProps) {
  return (
    <div className="mark-item">
      {showCheckBox && <input type="checkbox" className="mark-item__checkbox" />}
      <button
        type="button"
        className="mark-item__body"
        style={{ backgroundColor: `${mark.color}50` }}
      >
        <div className="mark-item__circle" style={{ backgroundColor: mark.color }} />
        <p className="mark-item__text">{mark.text}</p>
      </button>
      {showPensil && (
        <button type="button" className="mark-item__pensil">
          Редактировать метку
        </button>
      )}
    </div>
  );
}

export default MarkItem;
