import { Route, Routes } from 'react-router-dom';

import Header from '../../Components/Header';
import Main from '../../Pages/Main';
import Board from '../../Pages/Board';
import Login from '../../Pages/Login';
import Footer from '../../Components/Footer';
import { APPRoute } from '../../const/const';

function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={APPRoute.main} element={<Main />} />
        <Route path={APPRoute.board} element={<Board />} />
        <Route path={APPRoute.login} element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RootRouter;
