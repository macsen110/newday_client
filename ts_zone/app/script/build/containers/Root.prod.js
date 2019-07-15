import PropTypes from 'prop-types';
import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import routes from '../routes';
export default function Root({ history }) {
    return (
        <Router history={history}>
            <BrowserRouter basename="/ts_zone">
                {routes}
            </BrowserRouter>
        </Router>
    );
}

Root.propTypes = {
    history: PropTypes.object.isRequired
};