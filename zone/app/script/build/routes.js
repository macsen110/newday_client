import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Index from 'bundle-loader?lazy!./components/index';
import login from 'bundle-loader?lazy!./components/login';

// import communicate from './components/communicate';
import AsyncComponent from './async-loader';

class Bundle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mod: null
        }
    }
  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    console.log(props)
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

const InitIndex = (props) => (
    <Bundle load={Index}>
        {(InitIndex) => <InitIndex {...props} />}
    </Bundle>
)


const InitLogin = (props) => (
    <Bundle load={login}>
        {(InitLogin) => <InitLogin {...props} />}
    </Bundle>
)
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