'use strict';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import { createBrowserHistory } from 'history';
import Root from './containers/Root';
import { render } from 'react-dom';
import reducer from './reducers/init'
import { FetchesContext } from './context'
import 'assets/style.css';

const {
	useReducer
} = React
const history = createBrowserHistory();
function Roots(props: any) {
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