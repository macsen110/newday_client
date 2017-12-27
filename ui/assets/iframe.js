;(function () {
  var codeTagList = document.querySelectorAll('.code');
  if (codeTagList.length) {
    [].forEach.call(codeTagList, formatCodeTag.bind(null))
  }

}())

function formatCodeTag(codeTag) {
  var html = codeTag.innerHTML
  var pattern = html.match(/\s*\n[\t\s]*/);
  codeTag.innerHTML = html.replace(new RegExp(pattern, "g"),'\n');
}

/**
 * Tab 组件Demo
 */
;(function () {
  var tabDemoDom = document.getElementById('tab_Widget_demo')
  var addTabBtn = document.getElementById('add_tab_btn')
  if (tabDemoDom) {
    var lastIndex = 3;
    var tab = demoTab()
    addTabBtn.addEventListener('click', function () {
      tab.tabNavContainer.insertAdjacentHTML('beforeend', "<li class='item'>nav-"+lastIndex+"</li>")
      tab.tabConContainer.insertAdjacentHTML('beforeend', "<li class='item'>content-"+lastIndex+"</li>")
      lastIndex++
    })
    
  }
  function demoTab() {
    return window.YAO_M_UI.TabWidget({
      curIdex: 1,
      callback: function (idx) {
        console.log(idx)
      }
    });
  }
}())

/***
 * totast插件
 */
;(function () {
  var totastDemo = document.getElementById('totast_demo');
  var totastDemoBtn1 = document.getElementById('totast_demo_btn1')
  var totastDemoBtn2 = document.getElementById('totast_demo_btn2')
  if (totastDemo) {
    totastDemoBtn1.addEventListener('click', function () {
      window.YAO_M_UI.showPrompt('我是简单totast弹层,3秒消失')
    })
    totastDemoBtn2.addEventListener('click', function () {
      window.YAO_M_UI.showPrompt({
        msg: '<span style="color: red">我是</span>html代码',
        cb: function (idx) {
          alert('5秒完毕,我消失了')
        },
        className: 'some-class-name',
        duration: 5000
      })
    })
  }
} ())

/**
 * dialog 插件
 */

 ;(function () {
   var dialogDemo = document.getElementById('dialog_demo');
   var dialogDemoBtn = document.getElementById('dialog_demo_btn');
   if (dialogDemo) {
    dialogDemoBtn.addEventListener('click', function () {
      window.YAO_M_UI.Dialog({
        title: '我是标题',
        content: '我是内容',
        afterClose: function() {
          console.log('我是点击关闭按钮以后调用的')
        },
        afterOpen: function () {
          console.log('我是弹框触渲染到页面发以后弹的')
        },
        afterOk: function () {
          console.log('我是点击确定按钮触发的')
        },
        foot: '<button class="btn-dialog-ok">确定</button><button class="btn-dialog-cancel">取消<button>'
      })
    })
   }
 }())