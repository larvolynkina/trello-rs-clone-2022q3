import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { APPRoute, AuthorizationStatus } from '../../const/const';
import UserProfileIcon from './UserProfileIcon';

function Auth() {
  const { authorizationStatus } = useAppSelector((state) => state.USER);
  const navigate = useNavigate();

  const handleSignUpBtnClick = () => navigate(APPRoute.login);

  return (
    <div>
      {authorizationStatus !== AuthorizationStatus.Auth ? (
        <button type="button" onClick={handleSignUpBtnClick}>
          Войти
        </button>
      ) : (
        <UserProfileIcon />
      )}
    </div>
  );
}

export default Auth;
