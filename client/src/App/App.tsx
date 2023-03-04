import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootRouter from './RootRouter';
import { store } from '../store/rootReducer';
import { injectStore } from '../services/api';
import { checkAuthAction } from '../store/serviceActions';

injectStore(store);

store.dispatch(checkAuthAction());

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
