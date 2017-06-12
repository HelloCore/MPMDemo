// @flow
import React, { Component } from 'react';
import createStore from '../store/store';
import { Provider } from 'react-redux';
import HomeContainer from './HomeContainer';

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const store = createStore({});
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}><HomeContainer /></div>
      </Provider>
    );
  }
}

export default AppContainer;
