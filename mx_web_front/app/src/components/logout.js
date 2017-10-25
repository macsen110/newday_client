import React from 'react';
import xhr from '../utils/xhr';
import {connect} from 'react-redux'; 
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {initAction} from '../actions/actions';
//register views
class logout extends React.Component {
    //static contextTypes = Object.assign({},{history: PropTypes.history});
    componentWillMount() {
        var self = this;
        new xhr({
            url: '/api/users/logout',
            done: function(callData) {
                if(callData.code == 0) {
                    self.props.initAction({isLogin: false});
                    self.props.history.push('/')
                }
            },
            withCredentials: true,
            faild: function() {
                var error = new Error('something wrong')

            }
        })
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default connect(null, {initAction})(logout);