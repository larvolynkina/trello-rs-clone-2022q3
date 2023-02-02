import { Link } from 'react-router-dom';

import './Promo.scss';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__right">
          <h1 className="promo__title">
            Trello помогает собрать всех сотрудников, задачи и инструменты в одном месте
          </h1>
          <p className="promo__text">
            Объедините все в одном месте, даже если участники вашей команды рассеяны по миру.
          </p>
          <Link to="/signup" className="promo__signup-btn">
            Зарегистрируйтесь — это бесплатно!
          </Link>
        </div>
        <div className="promo__left">
          <img src="/assets/img/main/promo-image.webp" alt="trello board" />
        </div>
      </div>
    </section>
  );
}

export default Promo;
