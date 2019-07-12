import * as React from 'react';
import xhr from '../utils/xhr';
import { SHOWGOOD, POSTCOMMET, DELETECOMMET, LISTCOMMETS } from '../actions';
import { showPrompt } from 'yao-m-ui';
import reducer from "../reducers/showGoodTs"
import reduceCommets from '../reducers/commetsTs'
const {
    useReducer,
    useEffect,
    useRef
} = React
const unLoginCode = '00002';
function _fetchGoods(id) {
    return new Promise(function (resolve, reject) {
        new xhr({
            url: '/api/goods/detail/' + id,
            done: function (callData) {
                resolve(callData)
            },
            faild: function () {
                var error = new Error('something wrong')
                reject(error)
            }

        })

    })
}
function _delCommet(C_id, goodsid) {
    return new Promise((res, rej) => {
        new xhr({
            url: '/api/comments/' + goodsid + '/' + C_id,
            method: 'DELETE',
            done: (obj) => {
                if (obj.code === 0) res(+C_id)
                if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg })
                if (obj.code !== 0) return showPrompt({ msg: obj.msg })
            }
        })
    })

}
function _submitCommet(goodsid, content) {
    let commentData = JSON.stringify({
        goodsid,
        content
    });
    // @ts-ignore
    return fetch(perfixerURL + '/api/comments/', {
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
        if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg })
        if (obj.code !== 0) return showPrompt({ msg: obj.msg })
    })
}

function _delGoods(id) {
    // @ts-ignore
    return fetch(perfixerURL + '/api/goods/delete/' + id, {
        method: 'DELETE',
        credentials: "include"
    }).then(function (res: any) {
        if (res.ok) {
            return res.json()
        }
    }).then((obj) => {
        return obj;
        //if (obj.code === unLoginCode) return showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') })
        //if (obj.code == 0) {
        //props.history.push('/goods/list')
        //}
    })
}
function GoodsDetail(props: any) {
    const [state, dispatch] = useReducer(reducer, {})
    const [commets, dispatchCommets] = useReducer(reduceCommets, [])
    let files = state.files || '';
    useEffect(() => {
        _fetchGoods(props.match.params.id).then((obj: any) => {
            dispatch({ type: SHOWGOOD, value: obj.detail })
            dispatchCommets({ type: LISTCOMMETS, value: obj.commets })
        })
    }, [])
    const deleteGoods = () => {
        _delGoods(props.match.params.id)

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
                <Commets commets={commets} goodsid={state.id}/>
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




function Commets(props: any) {
    let { commets, goodsid } = props
    if (commets.length) {
        return (
            <div className="commets-container">
                <ul className="commets-list">
                {commets.map((item, index) => <CommetItem goodsid={goodsid} C_content={item.C_content}  key={index} C_id={item._id} />)}
                </ul>
                <InputContainer goodsid={goodsid} />
            </div>
        )
    }
    return (
        <div className="commets-contain">
            <InputContainer goodsid={goodsid} />
        </div>
    )

}
function CommetItem(props) {
    const {
        C_content, 
        C_id,
        goodsid
    } = props
    const delCommet = (e) => {
        var item = e.target.parentNode;
        var C_id = item.dataset.id;
        _delCommet(C_id, goodsid)
    }
    return (
        <li className="item" data-id={C_id}>
            <span className="con">{'游客评论: ' + C_content}</span>
            <span className="del" onClick={(e) => delCommet(e)}>删除</span>
        </li>
    )
}
function InputContainer(props) {
    let wrap_comment = useRef<HTMLTextAreaElement>(null);
    const submitCommet = () => {
        let commentEle = wrap_comment.current;
        _submitCommet(props.goodsid, commentEle ? commentEle.value : '')
    }
    return (
        <div  className="input-container">
            <textarea className="ipt" ref={wrap_comment} />
            <p><button onClick={submitCommet} className="btn">提交评论</button></p>
        </div>
    )
}

export default GoodsDetail


