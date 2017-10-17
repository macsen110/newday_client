import React from 'react';
import xhr from '../utils/xhr';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux'; 
import {initAction} from '../actions/actions';
import {showPrompt} from 'yao-m-ui';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();
//Login views
/**
 * 
 */
class Login extends React.Component {
    //static contextTypes = Object.assign({},{history: PropTypes.history});

    constructor(props, context) {       
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = this.refs.registerForm;
        if (!form['username'].value) {
            showPrompt('请填写用户名!');
            return false;
        }
        if (!form['password'].value) {
            showPrompt('请填写密码');
            return false;
        }
        var senddatas = JSON.stringify({
            username:form['username'].value,
            password: form['password'].value,
            test: null
        });
        
        var url = form.action;
        var promise = new Promise(function(resolve, reject ){
            new xhr({
                setHeader:  'application/json',
                sendData: senddatas,
                method: 'POST',
                url: url,
                done: function(callData) {
                    resolve(callData)
                },
                faild: function() {
                    var error = new Error('something wrong')
                    reject(error)
                }

            })

        })        
        promise.then(
            obj => {
                if(obj.code == 0) {
                    showPrompt({
                        msg: obj.msg,
                        cb:  ()=> {
                            this.props.initAction({isLogin: obj.isLogin})
                            this.props.history.push({pathname: '/goods/upload'})
                        }
                    });
                };
            }, 
            error => console.log(error)
        )
    }
    render() {
        return (
            <div id="register_page" className="app-register-page">
                <p className="page-title">login</p>
                <form method="post" action="/api/users/validuser" className="form1" ref = "registerForm" onSubmit={this.handleSubmit}>
                    <p className="pt20"><input type="text" name="username" className="ipt" placeholder="username" /></p>
                    <p className="pt20"><input type="password" name="password" className="ipt" placeholder="password" /></p>
                    <p className="pt20"><input type="submit" className="btn" /></p>
                    
                </form>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            // navigated!
        }
    }
}
export default connect(null, {initAction})(Login);