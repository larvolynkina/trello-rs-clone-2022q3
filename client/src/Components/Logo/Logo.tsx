import classNames from 'classnames';

import './Logo.scss';

type LogoProps = {
  className?: string;
};

function Logo({ className = '' }: LogoProps) {
  return (
    <div
      className={classNames('logo', {
        [className]: className,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        className="logo__svg"
        viewBox="0 0 24 24"
        aria-label="Boards"
      >
        <rect fill="none" height="24" width="24" />
        <path d="M11,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h6V21z M13,21h6c1.1,0,2-0.9,2-2v-7h-8V21z M21,10V5c0-1.1-0.9-2-2-2h-6v7H21z" />
      </svg>
      <span className="logo__text">Boards</span>
    </div>
  );
}

Logo.defaultProps = {
  className: '',
};

export default Logo;
