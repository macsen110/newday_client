import * as React from 'react';
import xhr from '../utils/xhr';
import reducer from '../reducers/init'
import { LOGOUT } from '../actions';
const {
    useEffect,
    useReducer
} = React
//register views
function Logout(props: any) {
    const [state, dispatch] = useReducer(reducer, {isLogin: false})
    useEffect(() => {
        new xhr({
            url: '/api/users/logout',
            done: function (callData) {
                if (callData.code == 0) {
                    dispatch({type: LOGOUT})
                    props.history.replace({ pathname: '/' })
                }
            },
            withCredentials: true,
            faild: function () {
                var error = new Error('something wrong')

            }
        })
    }, [])

    return (<></>)
}

export default Logout;