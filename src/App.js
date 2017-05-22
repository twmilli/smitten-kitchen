import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { setCustomText } from 'react-native-global-props';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const customTextProps = {
  style: {
    fontFamily: 'Fjord-One',
    fontWeight: '900'
  }
};

setCustomText(customTextProps);

export default App;
