import person from './icons/person.svg';
import check from './icons/check.svg';
import attach from './icons/attach.svg';
import mark from './icons/mark.svg';
import deleteIco from './icons/delete-ico.svg';

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
    text: 'Удалить',
    ico: deleteIco,
  },
];

export { asideAddButtons, asideActionButtons };
