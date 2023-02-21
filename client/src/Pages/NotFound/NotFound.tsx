import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className='not-found'>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='not-found__link' to="/">Перейти на главную страницу</Link>
    </div>
  );
}

export default NotFound;
