import classNames from 'classnames';
import './Tabs.scss';

export type Tab = {
  id: number;
  label: string;
};

export type TabsProps = {
  currentId: number;
  tabs: Tab[];
  handleTabClick: (id: number) => void;
};

function Tabs({ currentId, tabs, handleTabClick }: TabsProps) {
  return (
    <ul className="tabs">
      {tabs.map(({ id, label }) => (
        <li
          key={id}
          className={classNames('tabs__tab', { 'tabs__tab--active': id === currentId })}
          onClick={() => handleTabClick(id)}
          role="presentation"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
