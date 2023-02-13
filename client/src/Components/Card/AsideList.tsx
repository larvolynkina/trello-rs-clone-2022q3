import React from 'react';
import AsideButton from './AsideButton';

interface IAsideButton {
  text: string;
  ico: string;
}

interface AsideListProps {
  title: string;
  buttons: IAsideButton[];
}

function AsideList({ title, buttons }: AsideListProps) {
  return (
    <div className="card__aside-list">
      <h3>{title}</h3>
      <div>
        {buttons.map((button) => (
          <AsideButton text={button.text} ico={button.ico} key={button.text} />
        ))}
      </div>
    </div>
  );
}

export default AsideList;
