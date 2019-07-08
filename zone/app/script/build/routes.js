import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Index from 'bundle-loader?lazy!./components/index';
import login from 'bundle-loader?lazy!./components/login';
// import communicate from './components/communicate';
import AsyncComponent from './async-loader';
async function fetchAsyncCommpoent(name) {
    return await import('./components/'+name)
}
const App = AsyncComponent(() => fetchAsyncCommpoent('app'))
const asyncIndex = AsyncComponent(Index, 1)
const asyncLogin = AsyncComponent(login, 1)
const goodsList = AsyncComponent(() => fetchAsyncCommpoent('goodslist'))
const goodsUpload = AsyncComponent(() => fetchAsyncCommpoent('goodsupload'))
const goodsDetail = AsyncComponent(() => fetchAsyncCommpoent('goodsdetail'))
const communicate = AsyncComponent(() => fetchAsyncCommpoent('communicate'))
const register = AsyncComponent(() => fetchAsyncCommpoent('register'))
const logout = AsyncComponent(() => fetchAsyncCommpoent('logout'))
const notFound = AsyncComponent(() => fetchAsyncCommpoent('notfind'))


var Routes = (
    <div>
        <Route component={App} />
        <div className="route-content-box">
            <Switch>
                <Route path="/" exact component={asyncIndex} />  
                <Route path="/user/login" component= {asyncLogin}/>      
                <Route path="/user/register" component={register} />
                <Route path="/goods/upload" component = {goodsUpload} />
                <Route path="/goods/list" component = {goodsList}  />
                <Route path="/goods/detail/:id" component={goodsDetail}/>
                <Route path="/communicate" component={communicate}/>
                <Route path="/user/logout" component={logout} />
                <Route component={notFound} />
            </Switch>
        </div>
    </div>
);

export default Routes;