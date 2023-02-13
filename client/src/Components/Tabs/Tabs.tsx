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
  className?: string;
};

function Tabs({ currentId, tabs, handleTabClick, className = '' }: TabsProps) {
  return (
    <ul className={classNames('tabs', { [className]: className !== '' })}>
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

Tabs.defaultProps = {
  className: '',
};

export default Tabs;
