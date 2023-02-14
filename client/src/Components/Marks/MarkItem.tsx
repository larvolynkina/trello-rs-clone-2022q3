import { IMark } from "../../types/card";

type MarkItemProps = {
  showCheckBox: boolean;
  mark: IMark;
}

function MarkItem({showCheckBox, mark}: MarkItemProps) {
  return (
    <div className="mark-item">
      {showCheckBox && <input type="checkbox" className="mark-item__checkbox" />}
      <div className="mark-item__body">
        <div className="mark-item__circle" />
        <p className="mark-item__text">{mark.text}</p>
      </div>
      
    </div>
  );
}

export default MarkItem;
