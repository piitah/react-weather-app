import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from "redux-thunk"

import rootReducer from '../src/store/reducers/weatherReducer'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  weather: rootReducer
})
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
