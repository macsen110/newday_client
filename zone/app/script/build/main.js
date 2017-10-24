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

import routes from './routes';
import ReactDOM from 'react-dom';
import { createRedux } from 'redux';
import { Provider } from 'react-redux';
import configureStores from './stores/configureStores';
const store = configureStores();
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const render = () => {ReactDOM.render((
	<AppContainer>
		<Provider store={store}>
			<Router history={history}>
				<BrowserRouter basename="/zone">
					{routes}
				</BrowserRouter>
			</Router>
			
		</Provider>
	</AppContainer>
), document.getElementById('router_container'));
}
render()
if (module.hot) {
  module.hot.accept()
}