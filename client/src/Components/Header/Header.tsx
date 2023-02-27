import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../Logo';
import Auth from '../Auth/Auth';
import './Header.scss';
import { APPRoute } from '../../const/const';

function Header() {
  const { pathname } = useLocation();

  return (
    <header
      className={classNames('header', {
        'header--hide': pathname === APPRoute.login || pathname === APPRoute.signUp,
      })}
    >
      <div
        className={classNames('header__container', {
          'header__container--board': pathname.startsWith('/boards'),
        })}
      >
        <Link to={APPRoute.main}>
          <Logo />
        </Link>

        <Auth />
      </div>
    </header>
  );
}

export default Header;
