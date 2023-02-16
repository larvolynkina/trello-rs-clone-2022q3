import { Navigate, useLocation } from 'react-router-dom';
import { APPRoute, AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks/redux';

type RedirectProps = {
  outlet: JSX.Element;
};

function Redirect({ outlet }: RedirectProps) {
  const { authorizationStatus } = useAppSelector((state) => state.USER);

  const location = useLocation();

  if (authorizationStatus !== AuthorizationStatus.Auth) return outlet;

  const path = location.state?.from;

  return (
    <Navigate
      to={{ pathname: path?.pathname || APPRoute.workspaces, search: path?.search || '' }}
      replace
    />
  );
}

export default Redirect;
