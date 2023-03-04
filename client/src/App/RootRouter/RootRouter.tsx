import { Route, Routes } from 'react-router-dom';

import Header from '../../Components/Header';
import Main from '../../Pages/Main';
import Board from '../../Pages/Board';
import Login from '../../Pages/Login';
import Footer from '../../Components/Footer';
import { APPRoute } from '../../const/const';
import SignUp from '../../Pages/SignUp';
import ProtectedRoute from '../../Components/ProtectedRoute';
import Redirect from '../../Components/Redirect';
import Profile from '../../Pages/Profile';
import Workspaces from '../../Pages/Workspaces';
import NotFound from '../../Pages/NotFound/NotFound';
import Forbidden from '../../Pages/Forbidden/Forbidden';


function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={APPRoute.main} element={<Redirect outlet={<Main />} />} />
        <Route path={APPRoute.board} element={<ProtectedRoute outlet={<Board />} />} />
        <Route path={APPRoute.profile} element={<ProtectedRoute outlet={<Profile />} />} />
        <Route path={APPRoute.login} element={<Redirect outlet={<Login />} />} />
        <Route path={APPRoute.signUp} element={<Redirect outlet={<SignUp />} />} />
        <Route path={APPRoute.workspaces} element={<ProtectedRoute outlet={<Workspaces />} />} />
        <Route path={APPRoute.forbidden} element={<ProtectedRoute outlet={<Forbidden />} />} />
        <Route path={APPRoute.notFound} element={<Redirect outlet={<NotFound />} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RootRouter;
