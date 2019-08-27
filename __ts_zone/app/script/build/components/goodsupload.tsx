import * as React from 'react';
import xhr from '../utils/xhr';
import { showPrompt } from 'yao-m-ui';
const {
    useState,
    useRef,
    useEffect
} = React
const unLoginCode = '00002';
export default function goodsUpload(props) {
    const [type, setType] = useState('image');
    const [uploadFiles, setUploadFiles] = useState([]);
    const [typeDesc, setTypeDesc] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    const changeSelectType = (e) => {
        setType(e.target.value)
        setUploadFiles([])
    }
    const handleUploadFiles = (e) => {
        var filesArr = [];
        var upFiles: [] = e.target.files;
        let i: any = 0;
        for (i in upFiles) {
            if (i >= 0) filesArr.push(upFiles[i]);
        }
        setUploadFiles(filesArr)
    }
    const readFile = (file: any) => {
        var createObjectURLfun = function (file) {
            if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
                // @ts-ignore
                return window.webkitURL.createObjectURL(file);
            } else {
                return window.URL.createObjectURL(file);
            }
        };
        switch (type) {
            case 'image':
                return <img src={createObjectURLfun(file)} />
            case 'video':
                return <img src="/imgs/video.jpg" />
            default:
                return ''
        }
    }
    const getDesc = (type: string) => {
        var typeDesc: string;
        switch (type) {
            case 'video':
                typeDesc = "视频";
                break
            case 'note':
                typeDesc = "笔记"
                break;
            case 'image':
            default:
                typeDesc = "图文";
                break
        }
        return typeDesc
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let form: any = formRef.current
        let fetchDescMapType = {
            "image": '图片',
            "video": "视频"
        }
        if (!form) return;
        if (!form.title.value) return showPrompt('标题不能为空');
        if (!form.content.value) return showPrompt('内容不能为空');
        if (type !== 'note' && uploadFiles.length === 0) return showPrompt(`请上传${fetchDescMapType[type]}`)
        var url = '/api/goods/upload';
        var formdata = new FormData(form);
        var promise = new Promise(function (resolve, reject) {
            new xhr({
                cache: false,
                sendData: formdata,
                method: 'POST',
                url: url + '?time=' + Date.parse(new Date().toString()),
                done: function (callData) {
                    resolve(callData)
                },
                faild: function (error) {
                    reject(error)
                }

            })

        })
        promise.then(
            (obj: any) => {
                if (obj.code == 0) showPrompt({ msg: obj.msg, cb: () => props.history.push('/goods/list') });
                else if (obj.code === unLoginCode) showPrompt({ msg: obj.msg, cb: () => props.history.push('/user/login') });
            },
            error => console.log(error)
        )
    }

    return (
        <div id="app_upload_page" className="app-upload-page">
            <p className="page-title">添加文章</p>
            <form method="post" action="/api/goods/upload" className="form1" onSubmit={handleSubmit} ref={formRef}>
                <p className="pt20">
                    <input type="text" name="title" className="ipt" placeholder="文章标题" />
                </p>
                <div className="select-type">
                    发布{getDesc(type)}
                    <i className="sign"></i>
                    <select name="category" onChange={changeSelectType} defaultValue="image">
                        <option value="image">图文</option>
                        <option value="note">笔记</option>
                        <option value="video">视频</option>
                    </select>
                </div>
                {(type !== 'note') && (
                    <div className="wrap-upload-ipt">
                        上传{typeDesc}
                        <input type="file" onChange={handleUploadFiles} multiple={true} accept={type + "/*"} name="pics" className="ipt" placeholder="file" />
                    </div>
                )
                }
                {(uploadFiles.length > 0) && (<ul className="filesList">
                    {uploadFiles.map((item: any, index) => {
                        return <li className="item" key={index}>
                            {readFile(item)}
                            <em className="filename">{item.name}</em>
                            <em>{item.size}k</em>
                        </li>
                    })}
                </ul>)
                }
                <p className="pt20"><textarea className="ipt" name="content" placeholder="正文" /></p>
                <p className="pt20">
                    <input type="submit" className="btn" value="提交文章" />
                </p>
            </form>
        </div>)
}

