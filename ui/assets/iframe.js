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
  var totastDom = document.getElementById('totast_demo');
  var totastDomBtn1 = document.getElementById('totast_demo_btn1')
  var totastDomBtn2 = document.getElementById('totast_demo_btn2')
  if (totastDom) {
    totastDomBtn1.addEventListener('click', function () {
      window.YAO_M_UI.showPrompt('我是简单totast弹层,3秒消失')
    })
    totastDomBtn2.addEventListener('click', function () {
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