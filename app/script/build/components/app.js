import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {initAction} from '../actions/actions';
function mapStateToProps(state, ownProps) {
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
            <NavLink {...this.props}  activeClassName="active" />
        )
  }
}



//home views
class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        fetch("/api/home", {
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
                            <Tab to="/">10</Tab>
                            <Tab to="/goods/list">list</Tab>
                            <Tab to="/user/login">login</Tab>
                            <Tab to="/user/register">register</Tab>

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
                            <Tab to="/">ho111me</Tab>
                            <Tab to="/goods/list">list</Tab>
                            <Tab to="/goods/upload">upload</Tab>
                            <Tab to="/user/logout">logout</Tab>
                        </ul>
                    </header>
                </div>
            )

        }

        return (<p>loading...</p>)
    }
};
export default connect(mapStateToProps, {initAction})(App);
