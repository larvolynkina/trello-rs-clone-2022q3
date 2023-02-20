import React from 'react';
import AsideButton from './AsideButton';

interface IAsideButton {
  text: string;
  ico: string;
}

interface AsideListProps {
  title: string;
  buttons: IAsideButton[];
  boardId: string;
  cardId: string;
  closeCard?: () => void;
}

function AsideList({ title, buttons, boardId, cardId, closeCard }: AsideListProps) {
  return (
    <div className="card__aside-list">
      <h3>{title}</h3>
      <div>
        {buttons.map((button) => (
          <AsideButton
            text={button.text}
            ico={button.ico}
            key={button.text}
            boardId={boardId}
            cardId={cardId}
            closeCard={closeCard}
          />
        ))}
      </div>
    </div>
  );
}

AsideList.defaultProps = {
  closeCard: undefined,
};

export default AsideList;
