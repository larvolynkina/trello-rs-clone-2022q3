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

  const path = location.state?.from || APPRoute.board;

  return  <Navigate to={{ pathname: path.pathname, search: path.search }} replace />;
}

export default Redirect;
