import React, {Component} from 'react';
import xhr from '../utils/xhr';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { showPrompt } from 'yao-m-ui';
const unLoginCode = '00002';
export default class goodsUpload extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeSelectType= this.changeSelectType.bind(this);
        this.handleUploadFiles = this.handleUploadFiles.bind(this);
        this.readFile = this.readFile.bind(this);
        this.state = {
            initType: 'image',
            uploadFiles: []
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = this.refs.goodsUplodForm;  
        let type = this.state.initType;  
        let fetchDescMapType = {
            "image": '图片',
            "video": "视频"
        }    
        if (!form.title.value) return showPrompt('标题不能为空');
        if (!form.content.value) return showPrompt('内容不能为空');             
        if (type !== 'note' && this.state.uploadFiles.length === 0) return showPrompt(`请上传${fetchDescMapType[type]}`)
        var url = '/api/goods/upload';
        var formdata = new FormData(form);
        var promise = new Promise(function(resolve, reject ){
            new xhr({
                cache: false,
                sendData: formdata,
                method: 'POST',
                url: url + '?time=' +  Date.parse(new Date()),
                done: function(callData) {
                    resolve(callData)
                },
                faild: function(error) {
                    reject(error)
                }

            })

        })        
        promise.then(
            obj => {
                if (obj.code == 0)  showPrompt({msg: obj.msg, cb: () =>this.props.history.push('/goods/list')});
                else if (obj.code === unLoginCode) showPrompt({msg: obj.msg, cb: () => this.props.history.push('/user/login')});
            }, 
            error => console.log(error)
        )
    }
    changeSelectType(e) {
        this.setState({
           initType: e.target.value,
           uploadFiles: [] 
        })
    }
    handleUploadFiles(e) {
        var filesArr = [];
        var upFiles = e.target.files;
        for (var i in upFiles) {           
            if (i>=0) filesArr.push(upFiles[i]);           
        }      
        this.setState({
            uploadFiles: filesArr
        })
    }
    readFile(file) {
        var createObjectURLfun = function(file) {
            
            if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
                return window.webkitURL.createObjectURL(file);
            } else {
                return window.URL.createObjectURL(file);
            }
        };        
        switch (this.state.initType) {
            case 'image':
                return <img src ={createObjectURLfun(file)} /> 
            case 'video':
                return <img src ="/imgs/video.jpg" />
            default:
                return ''
        }
    }
    render() {
        var initTypeDesc;
        switch (this.state.initType) {
            case 'video':
                initTypeDesc = "视频";
                break
            case 'note':
                initTypeDesc = "笔记"
                break;
            case 'image':
            default:
                initTypeDesc = "图文";
                break          
        }

        return (
            <div id="app_upload_page" className="app-upload-page">
                <p className="page-title">添加文章</p>

                <form method="post" action="/api/goods/upload" className="form1" onSubmit={this.handleSubmit} ref = 'goodsUplodForm'>
                    <p className="pt20">
                        <input type="text" name="title" className="ipt" placeholder="文章标题" />
                    </p> 
                    <div className="select-type">
                        发布{initTypeDesc}
                        <i className="sign"></i>
                        <select name="category" onChange={this.changeSelectType} defaultValue="image">
                            <option value ="image">图文</option>
                            <option value ="note">笔记</option>
                            <option value="video">视频</option>
                        </select>
                    </div> 
                    {(()=>{
                        if (this.state.initType != 'note') {
                            return (
                                <div className="wrap-upload-ipt">
                                    上传{initTypeDesc}
                                    <input type="file" onChange={this.handleUploadFiles} multiple="multiple" accept={this.state.initType + "/*"} name="pics" className="ipt" placeholder="file" />
                                </div>
                                )
                        }
                    })()}  
                    {(() => {
                        if (this.state.uploadFiles.length) {
                            return (<ul className="filesList">
                                {this.state.uploadFiles.map((item, index) => {
                                    return <li className="item" key={index}>
                                    {this.readFile(item)}
                                    <em className="filename">{item.name}</em>
                                    <em>{item.size}k</em>
                                </li>}, this)}
                            </ul>)
                        }
                    })()}               
                    <p className="pt20"><textarea className="ipt" name="content" placeholder="正文" /></p>
                    <p className="pt20">
                        <input type="submit" className="btn" value="提交文章" />
                    </p>
                </form>
            </div>
        )    
    }
        
}

