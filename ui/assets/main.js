;(function () {
  var navs = document.querySelectorAll('.aside-nav');
  [].forEach.call(navs, function (item) {
    item.addEventListener('click', function () {
      this.classList.add('active')
    }.bind(item))
  })
}())