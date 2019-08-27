import * as React from 'react';
import xhr from '../utils/xhr';
import { LOGOUT } from '../actions';
import {FetchesContext} from '../context'
const {
    useEffect,
    useContext
} = React
//register views
function Logout(props: any) {
    const {state, dispatch} = useContext(FetchesContext)
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