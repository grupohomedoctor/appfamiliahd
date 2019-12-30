import React from 'react';
import VerifyLogin from './components/VerifyLogin';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <VerifyLogin />
    </PersistGate>
  </Provider>
);

export default App;
