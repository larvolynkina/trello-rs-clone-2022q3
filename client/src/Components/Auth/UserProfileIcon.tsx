import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { logoutAction } from '../../store/serviceActions';

import './UserProfileIcon.scss';

function UserProfileIcon() {
  const dispatch = useAppDispatch();

  const handleLogoutBtnClick = () => dispatch(logoutAction());

  return (
    <div className="user-profile-icon">
      <button type="button" onClick={handleLogoutBtnClick}>
        Выйти
      </button>
      <Link to="/profile" className="user-profile-icon__profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm3-12a3 3 0 11-6 0 3 3 0 016 0zm-9 7a7.489 7.489 0 016-3 7.489 7.489 0 016 3 7.489 7.489 0 01-6 3 7.489 7.489 0 01-6-3z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

export default UserProfileIcon;
