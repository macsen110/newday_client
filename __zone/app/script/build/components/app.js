import React, {Component} from 'react';
import {
  NavLink
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {initAction} from '../actions/actions';
function mapStateToProps(state) {
    return {
        initData: state.initData
    };
}

class Tab extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <li className="item"><NavLink {...this.props}  activeClassName="active" /></li>
        )
  }
}



//home views
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        fetch(perfixerURL+"/api/home", {
            credentials: 'include'
        })
        .then(function(res){
            if (res.ok) {
                return res.json()
            }
        })
        .then((obj) => this.props.initAction(obj))
    }
    componentWillUnmount() {
    }
    render() {
        var initData = this.props.initData;
        if (!initData.isLogin) {
            return (
                <div className="wrap-header-container">                    
                    <header className="header">
                        <ul className="app-nav-list">
                            <Tab exact to="/">首页</Tab>
                            <Tab to="/goods/list">发现</Tab>
                            <Tab to="/goods/upload">上传</Tab>
                            <Tab to="/user/login">登录</Tab>
                        </ul>
                    </header>
                </div>
                
            )
        }
        
        else {
            return (
                <div className="wrap-header-container">                    
                    <header className="header">
                        <ul className="app-nav-list">
                            <Tab exact to="/">首页</Tab>
                            <Tab to="/goods/list">发现</Tab>
                            <Tab to="/goods/upload">上传</Tab>
                            <Tab to="/communicate">我</Tab>
                        </ul>
                    </header>
                </div>
            )

        }
    }
};
export default connect(mapStateToProps, {initAction})(App);
