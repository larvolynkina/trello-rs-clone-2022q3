import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutAction } from '../../store/serviceActions';
import UserAvatar from '../UserAvatar';

import './UserProfileIcon.scss';

function UserProfileIcon() {
  const { userData } = useAppSelector((state) => state.USER);
  const dispatch = useAppDispatch();

  if (!userData) return null;

  const handleLogoutBtnClick = () => dispatch(logoutAction());

  return (
    <div className="user-profile-icon">
      <button type="button" onClick={handleLogoutBtnClick}>
        Выйти
      </button>
      <Link to="/profile" className="user-profile-icon__profile">
        <UserAvatar participant={userData} className="header__avatar" />
      </Link>
    </div>
  );
}

export default UserProfileIcon;
