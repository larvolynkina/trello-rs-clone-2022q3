import './columnCard.scss';
import { IColumnCard } from '../../types/columns';

type ColumnCardProps = {
  card: IColumnCard;
};

function ColumnCard({ card }: ColumnCardProps) {
  return <li className="column-card">{card.title}</li>;
}

export default ColumnCard;
