import * as React from 'react';
import xhr from '../utils/xhr';
import { SHOWGOOD, POSTCOMMET, DELETECOMMET, LISTCOMMETS } from '../actions';
import { showPrompt } from 'yao-m-ui';
import reducer from "../reducers/showGoodTs"
import reduceCommets from '../reducers/commetsTs'
const {
    useReducer,
    useEffect,
    useRef,
    useState
} = React
const unLoginCode = '00002';

function Goods(props: any) {

}
function GoodsDetail(props: any) {
    const [state, dispatch] = useReducer(reducer, {})
    const [commets, dispatchCommets] = useReducer(reduceCommets, [])
    let files = state.files || '';
    let wrap_comment = useRef<HTMLDivElement>(null);
    useEffect(() => {
        var promise = new Promise(function (resolve, reject) {
            new xhr({
                url: '/api/goods/detail/' + props.match.params.id,
                done: function (callData) {
                    resolve(callData)
                },
                faild: function () {
                    var error = new Error('something wrong')
                    reject(error)
                }

            })

        })
        promise.then(
            (obj: any) => {
                dispatch({ type: SHOWGOOD, value: obj.detail })
                dispatchCommets({type: LISTCOMMETS, value: obj.commets})
            },
            (error) => console.log(error)
        )
    }, [])
    // useEffect(() => {
    //     commets = state.commets;
    // }, [state])
    const deleteGoods = () => {
        // @ts-ignore
        fetch(perfixerURL + '/api/goods/delete/' + props.match.params.id, {
            method: 'DELETE',
            credentials: "include"
        }).then(function (res: any) {
            if (res.ok) {
                return res.json()
            }
        }).then((obj) => {
            if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') })
            if (obj.code == 0) {
                props.history.push('/goods/list')
            }
        })
    }
    const submitComment = (props) => {
        var commentEle = wrap_comment[0].querySelector('textarea');
        var commentData = JSON.stringify({
            goodsid: props.match.params.id,
            comment: commentEle.value.trim()
        });
        // @ts-ignore
        fetch(perfixerURL + '/api/comments/', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: commentData
        }).then(function (res: any) {
            if (res.ok) {
                return res.json()
            }
        }).then((obj) => {
            if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') })
            if (obj.code !== 0) return showPrompt({ msg: obj.msg })
            props.postCommetAction({ C_content: obj.commet, _id: obj._id, C_user: obj.C_user })
            commentEle.value = '';
        })
    }
    if (state.id) {
        return (
            <div className="app-detail-page">
                <p className="page-title">{state.title}</p>
                {
                    files.length > 0 && (<ul className="uri-list">
                        {files.map((item, index) => <Blog_item key={index} item={item} category={state.category} />)}
                    </ul>)
                }
                {

                    state.content != '' && (<p className="content">{state.content}</p>)
                }
                {commets.length ?
                    <div className="comments-container">
                        <p className="comments-title">评论</p>
                        <ul className="list">{commets.map((item, index) => <CommetItem goodsId={state.id} history={props.history} user={props.initData.user} author={state.user} C_user ={item.C_user}   key={index} item={item} />)}</ul>
                    </div>
                    : ''
                }
                <div ref={wrap_comment}>
                    <textarea className="ipt" />
                    <p><button onClick={submitComment} className="btn">提交评论</button></p>
                </div>
            </div>
        )
    }
    return (<div>{props.match.params.id}</div>)
}




function Blog_item(props) {

    var item = props.item;
    var category = props.category;
    var itemEle;
    switch (category) {
        case 'image':
            itemEle = <img src={'//res.macsen318.com' + item.path} width={item.width} />;
            break;
        case 'video':
            itemEle = <video src={'//res.macsen318.com' + item.path} autoPlay></video>;
            break;
        case 'note':
            if (item.url) {
                itemEle = <div><p>{item.content}</p><p><img src={'//res.macsen318.com' + item.path} width={item.width / 2} /></p></div>;
            }
            else {
                itemEle = <p>{item.content}</p>;
            }
            break;
        default:
            break

    }
    return (<li className="item">{itemEle}</li>)

}

function CommetItem(props: any) {
    var item = props.item;
    let goodsId = props.goodsid
    const delCommet = (e) => {
        var item = e.target.parentNode;
        var C_id = item.dataset.id;
        new xhr({
            url: '/api/comments/' + goodsId + '/' + C_id,
            method: 'DELETE',
            done: (obj) => {
                if (obj.code === 0) props.deleteCommetAction(+C_id)
                if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') })
                if (obj.code !== 0) return showPrompt({ msg: obj.msg })
            }
        })

    }
    return (
        <li className="item" data-id={item._id}>
            <span className="con">{props.C_user + '评论: ' + item.C_content}</span>
            {(props.user == props.author || props.C_user == props.user) && <span className="del" onClick={(e) => delCommet(e)}>删除</span>}
        </li>
    )

}

export default GoodsDetail


