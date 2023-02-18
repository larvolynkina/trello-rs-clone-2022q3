import person from './icons/person.svg';
import check from './icons/check.svg';
import attach from './icons/attach.svg';
import mark from './icons/mark.svg'

const asideAddButtons = [
  {
    text: 'Участники',
    ico: person,
  },
  {
    text: 'Чек-лист',
    ico: check,
  },
  {
    text: 'Вложения',
    ico: attach,
  },
  {
    text: 'Метки',
    ico: mark,
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
