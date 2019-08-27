import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Router, BrowserRouter} from 'react-router-dom';
import routes from '../routes';
export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter basename="/zone">
					{routes}
				</BrowserRouter>
            </Router>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};