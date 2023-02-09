import { Navigate, useLocation } from 'react-router-dom';

import { APPRoute, AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks/redux';

type ProtectedRouteProps = {
  outlet: JSX.Element;
};

function ProtectedRoute({ outlet }: ProtectedRouteProps) {
  const { authorizationStatus } = useAppSelector((state) => state.USER);
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Auth) return outlet;

  return <Navigate to={{ pathname: APPRoute.login }} state={{ from: location.pathname }} />;
}

export default ProtectedRoute;