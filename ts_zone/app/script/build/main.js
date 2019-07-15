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
import { render } from 'react-dom';
import reducer from './reducers/init'
import { FetchesContext } from './context'
import 'assets/style.css';
function Roots(props) {
	const [state, dispatch] = useReducer(reducer, { isLogin: false })
	return <FetchesContext.Provider value={{ state, dispatch }}>{props.children}</FetchesContext.Provider>
}

render(
	<AppContainer>
		<Roots>
			<Root history={history} />
		</Roots>
	</AppContainer>,
	document.getElementById('root')
);