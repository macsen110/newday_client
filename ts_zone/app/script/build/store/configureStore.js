import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history'
import rootReducer from '../reducers/';
export const history = createBrowserHistory();
const middleware = routerMiddleware(history);
export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(middleware)
    )
  );
}