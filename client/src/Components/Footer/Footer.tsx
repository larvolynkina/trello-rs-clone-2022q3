import './Footer.scss';
import rsSchoolIco from './icon/rs-school-js.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>2023</p>
        <div className="footer__developers">
          <a href="https://github.com/evg-zlg">evg-zlg</a>
          <span>|</span>
          <a href="https://github.com/larvolynkina">larvolynkina</a>
          <span>|</span>
          <a href="https://github.com/Rz0R">Rz0R</a>
        </div>
        <a href="https://rs.school/js/">
          <img src={rsSchoolIco} alt="rsschool icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
