import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Auth from '../Auth/Auth';
import './Header.scss';

function Header() {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const [className, setClassName] = useState('header__container');

  useEffect(() => {
    if (pathname[1] === 'boards') {
      setClassName('header__container header__container--board');
    } else {
      setClassName('header__container');
    }
  }, [location]);

  return (
    <header className="header">
      <div className={className}>
        <Logo />
        <Auth />
      </div>
    </header>
  );
}

export default Header;
