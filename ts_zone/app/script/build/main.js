/**************
 react route

return 
* **********/
'use strict';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { history } from './store/configureStore';
import Root from './containers/Root';
import 'assets/style.css';
import  { render } from 'react-dom';

render(
	<AppContainer>
			<Root  history={history} />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
			const newConfigureStore = require('./store/configureStore');
			const newHistory = newConfigureStore.history;
			const NewRoot = require('./containers/Root').default;
			render(
					<AppContainer>
							<NewRoot  history={newHistory} />
					</AppContainer>,
					document.getElementById('root')
			);
	});
}