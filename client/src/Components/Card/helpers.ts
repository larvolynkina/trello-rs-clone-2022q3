import React from 'react';
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

function onMouseDownHandler(
  event: MouseEvent,
  ref: React.MutableRefObject<null>,
  setter: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const target = event.target as HTMLElement;
  const modal = ref.current as HTMLElement | null;
  if (modal && modal.contains(target)) {
    setter(modal && modal.contains(target));
  } else {
    setter(false);
  }
}

export { asideAddButtons, asideActionButtons, onMouseDownHandler };
