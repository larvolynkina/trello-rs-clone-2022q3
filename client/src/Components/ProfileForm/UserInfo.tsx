import { useState, MouseEvent } from 'react';
import classNames from 'classnames';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { useAppSelector } from '../../hooks/redux';
import UserAvatar from '../UserAvatar';
import Modal from '../Modal';
import ColorChangeForm from '../ColorChangeForm';
import './UserInfo.scss';

enum CurrentModalForm {
  NONE = 'none',
  COLOR = 'color',
  IMAGE = 'image',
}

function UserInfo() {
  const { userData } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<CurrentModalForm>(CurrentModalForm.NONE);

  const ref = useDetectClickOutside({
    onTriggered: () => setIsMenuActive(false),
  });

  const toggleMenu = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setIsMenuActive((prev) => !prev);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleOpenColorFormClick = () => {
    setCurrentModal(CurrentModalForm.COLOR);
    setIsModalOpen(true);
  };

  return (
    <div className="user-info">
      <div className="user-info__icon">
        <UserAvatar participant={userData} className="user-info__avatar" />

        <div
          className={classNames('user-info__hover', {
            'user-info__hover--active': isMenuActive,
          })}
        >
          <button
            type="button"
            className="user-info__btn"
            aria-label="change avatar"
            onClick={toggleMenu}
          />

          <ul
            ref={ref}
            className={classNames('user-info__menu', {
              'user-info__menu--active': isMenuActive,
            })}
          >
            <li className="user-info__item">Загрузить картинку</li>
            <li className="user-info__item" onClick={handleOpenColorFormClick} aria-hidden>
              Сменить цвет аватара
            </li>
          </ul>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {currentModal === CurrentModalForm.COLOR && (
            <ColorChangeForm onClose={handleModalClose} />
          )}
        </Modal>
      </div>

      <div className="user-info__contacts">
        <h2 className="user-info__title">Информация профиля</h2>
        <div className="user-info__contact">
          <h3 className="user-info__sub-title">Имя пользователя:</h3>
          <p className="user-info__value">{userData.userName}</p>
        </div>
        <div className="user-info__contact">
          <h3 className="user-info__sub-title">Адрес эл. почты:</h3>
          <p className="user-info__value">{userData.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
