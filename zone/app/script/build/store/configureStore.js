import thunk from 'redux-thunk';
import rootReducer from '../reducers/';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// const createStoreWithMiddleware = applyMiddleware(
//   thunk
// )(createStore);
export const history = createHistory();
const middleware = routerMiddleware(history);
export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(middleware)
        //DevTools.instrument()
    )
  );
}