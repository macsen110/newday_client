;(function () {
  var navs = document.querySelectorAll('.aside-nav');
  var curNavIndex = getCurNavIndex() ? Number(getCurNavIndex()) : 0;
  [].forEach.call(navs, function (item, index) {
    item.addEventListener('click', navClickFun.bind(item,item, index))
  })
  function navClickFun(item, index) {
    [].forEach.call(navs, function(item) {item.classList.remove('active')})
    this.classList.add('active');
    changeIframeContent(this.getAttribute('role'))
    storeCurNavIndex(index)
  }
  navClickFun.call(navs[curNavIndex], navs[curNavIndex], curNavIndex)
}())
function getCurNavIndex() {
  return sessionStorage.getItem('curNavIndex')
}
function storeCurNavIndex(index) {
  sessionStorage.setItem('curNavIndex', index)
}
function changeIframeContent(role) {
  var ifrmae = document.querySelector('iframe');
  ifrmae.setAttribute("src", './'+role+'.html')
}
