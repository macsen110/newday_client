import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import App from './components/app';
import Index from 'bundle-loader?lazy!./components/index';
import register from './components/register';
import login from 'bundle-loader?lazy!./components/login';
import logout from './components/logout';
import goodslist from './components/goodslist';
import goodsUpload from './components/goodsUpload';
import NotFound from './components/notfind';
import goodsDetail from './components/goodsdetail';
import communicate from './components/communicate';
import Async from './async-loader';



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
//const InitNewIndex = Async(Index)


var Routes = (
    <div>
        <Route component={App} />
        <div className="route-content-box">
            <Switch>
                <Route path="/" exact component={InitIndex} />        
                <Route path="/user/register" component={register} />
                <Route path="/user/login" component= {InitLogin}/>
                <Route path="/user/logout" component={logout} />
                <Route path="/goods/upload" component = {goodsUpload} />
                <Route path="/goods/list" component = {goodslist}  />
                <Route path="/goods/detail/:id" component={goodsDetail}/>
                <Route path="/communicate" component={communicate}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    </div>
);

export default Routes;