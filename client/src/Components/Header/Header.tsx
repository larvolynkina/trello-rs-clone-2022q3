import Logo from './Logo';
import Auth from '../Auth/Auth';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <Auth />
      </div>
    </header>
  );
}

export default Header;
