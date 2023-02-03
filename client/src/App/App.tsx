import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RootRouter from './RootRouter';
import { store } from '../store/rootReducer';
import { injectStore } from '../services/api';
import { checkAuthAction } from '../store/serviceActions';

injectStore(store);

store.dispatch(checkAuthAction());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
