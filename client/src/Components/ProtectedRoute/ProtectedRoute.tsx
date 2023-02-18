import { Navigate, useLocation } from 'react-router-dom';

import { APPRoute, AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../hooks/redux';
import Loader from '../Loader';

type ProtectedRouteProps = {
  outlet: JSX.Element;
};

function ProtectedRoute({ outlet }: ProtectedRouteProps) {
  const { authorizationStatus } = useAppSelector((state) => state.USER);
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <main className="authorization-page">
        <Loader />
      </main>
    );
  }

  if (authorizationStatus === AuthorizationStatus.Auth) return outlet;

  return <Navigate to={{ pathname: APPRoute.login }} state={{ from: location }} />;
}

export default ProtectedRoute;
