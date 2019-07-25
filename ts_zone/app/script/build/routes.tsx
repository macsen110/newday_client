import * as React from "react";
import {
    Route,
    Switch
} from 'react-router-dom';
import APPTOP from './components/app'
const {
    Suspense,
    lazy
} = React

const App = lazy(() => import('./components/app'))
const asyncIndex = lazy(() => import('./components/index'))
const goodsList = lazy(() => import('./components/goodslist'))
const asyncLogin = lazy(() => import('./components/login'))
const goodsUpload = lazy(() => import('./components/goodsupload'))
const goodsDetail = lazy(() => import('./components/goodsdetail'))
const register = lazy(() => import('./components/register'))
const logout = lazy(() => import('./components/logout'))
const notFound = lazy(() => import('./components/notfind'))
const tsHook = lazy(() => import('./components/ts_hook'))

var Routes = (
    <div>
        <APPTOP />
        <div className="route-content-box">
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={asyncIndex} />
                    <Route path="/user/login" component={asyncLogin} />
                    <Route path="/user/register" component={register} />
                    <Route path="/goods/upload" component={goodsUpload} />
                    <Route path="/goods/list" component={goodsList} />
                    <Route path="/goods/detail/:id" component={goodsDetail} />
                    <Route path="/user/logout" component={logout} />
                    <Route path="/ts_hook" component={tsHook} />
                    <Route component={notFound} />
                </Switch>
            </Suspense>
        </div>

    </div>
);

export default Routes;