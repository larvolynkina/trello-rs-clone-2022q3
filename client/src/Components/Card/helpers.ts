import clock from './icons/clock.svg';
import person from './icons/person.svg';
import check from './icons/check.svg';
import attach from './icons/attach.svg';

const asideAddButtons = [
  {
    text: 'Участники',
    ico: person,
  },
  {
    text: 'Даты',
    ico: clock,
  },
  {
    text: 'Чек-лист',
    ico: check,
  },
  {
    text: 'Вложения',
    ico: attach,
  },
];

const asideActionButtons = [
  {
    text: 'Перемещение',
    ico: '../../../public/assets/icon/card-title.svg',
  },
  {
    text: 'Копирование',
    ico: '../../../public/assets/icon/card-title.svg',
  },
  {
    text: 'Удалить',
    ico: '../../../public/assets/icon/card-title.svg',
  },
];

export { asideAddButtons, asideActionButtons };