import React from 'react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
