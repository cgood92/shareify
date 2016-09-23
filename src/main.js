import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store';
import router from './Router';

import jquery from 'jquery'
window.jQuery = window.$ = jquery;

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);