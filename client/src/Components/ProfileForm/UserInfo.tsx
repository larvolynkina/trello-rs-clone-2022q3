import { useAppSelector } from '../../hooks/redux';
import UserAvatar from '../UserAvatar';
import './UserInfo.scss';

function UserInfo() {
  const { userData } = useAppSelector((state) => state.USER);

  if (!userData) return null;

  return (
    <div className="user-info">
      <div className="user-info__icon">
        <UserAvatar participant={userData} className="user-info__avatar" />

        <div className="user-info__hover">
          <button type="button" className="user-info__btn" aria-label="load image" />
        </div>
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
