/**************
 react route

return 
* **********/
'use strict';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React, { useReducer } from 'react';
import { history } from './store/configureStore';
import Root from './containers/Root';
import 'assets/style.css';
import { render } from 'react-dom';
import reducer from './reducers/init'
import { FetchesContext } from './context'
function Roots() {
	const [state, dispatch] = useReducer(reducer, { isLogin: false })
	return <FetchesContext.Provider value={{ state, dispatch }}><Root history={history} /></FetchesContext.Provider>
}

render(
		<AppContainer>
			<Roots>
			</Roots>
		</AppContainer>
,
	document.getElementById('root')
);

// if (module.hot) {
// 	module.hot.accept('./containers/Root', () => {
// 		const newConfigureStore = require('./store/configureStore');
// 		const newHistory = newConfigureStore.history;
// 		const NewRoot = require('./containers/Root').default;
// 		render(
// 			<AppContainer>
// 				<FetchesContext.Provider value={{ state, dispatch }}>
// 					<NewRoot history={newHistory} />
// 				</FetchesContext.Provider>
// 			</AppContainer>,
// 			document.getElementById('root')
// 		);
// 	});
// }