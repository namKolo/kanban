// @flow
/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import type { Store } from '../types';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const mdws = [thunk];
const createAppStore = (): Store =>
  createStore(reducer, composeEnhancers(applyMiddleware(...mdws)));
export default createAppStore;
