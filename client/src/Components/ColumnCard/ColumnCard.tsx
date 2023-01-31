import './columnCard.scss';
import IColumnCard from '../../types';

type ColumnCardProps = {
  card: IColumnCard;
  // setCardList: (cards: IColumnCard[]) => void;
};

function ColumnCard({ card }: ColumnCardProps) {
  return <li className="column-card">{card.title}</li>;
}

export default ColumnCard;
