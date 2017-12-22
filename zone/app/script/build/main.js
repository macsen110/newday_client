/**************
 react route

return 
* **********/
'use strict';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import {
  Router,
  Route,
	Link,
	BrowserRouter
} from 'react-router-dom';
import cookie from './utils/cookie';
import routes from './routes';
import { createRedux } from 'redux';
import { Provider } from 'react-redux';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
import createBrowserHistory from 'history/createBrowserHistory';
import 'assets/style.css';
import ReactDom, { render } from 'react-dom';
const store = configureStore();
render(
	<AppContainer>
			<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
			const newConfigureStore = require('./store/configureStore');
			const newStore = newConfigureStore.configureStore();
			const newHistory = newConfigureStore.history;
			const NewRoot = require('./containers/Root').default;
			render(
					<AppContainer>
							<NewRoot store={newStore} history={newHistory} />
					</AppContainer>,
					document.getElementById('root')
			);
	});
}