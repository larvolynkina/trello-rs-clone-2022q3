import { Link } from 'react-router-dom';

function Forbidden() {
    return (
        <div className='forbidden'>
          <p className='forbidden__text'>Доступ запрещен. Это приватная страница.</p>
          <Link className='forbidden__link' to="/">Перейти на главную</Link>
        </div>
      );
}

export default Forbidden;
