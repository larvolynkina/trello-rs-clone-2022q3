import { AuthorizationStatus } from '../../const/const';
import UserProfileIcon from './UserProfileIcon';

const authorizationStatus: AuthorizationStatus = AuthorizationStatus.Auth;

function Auth() {
  return (
    <div>
      {authorizationStatus === AuthorizationStatus.NoAuth ? (
        <button type="button">Войти</button>
      ) : (
        <UserProfileIcon />
      )}
    </div>
  );
}

export default Auth;
