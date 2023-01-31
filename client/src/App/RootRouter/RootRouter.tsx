import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import Main from '../../Pages/Main';
import Board from '../../Pages/Board';
import Footer from '../../Components/Footer';

function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board" element={<Board />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RootRouter;
