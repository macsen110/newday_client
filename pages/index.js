;(function () {
  var config = [
    {
      pageName: 'home',
      component: {
        init: function (obj, r_instance) {
          console.log(obj)
          console.log(r_instance)
        }
      }
    },
    {
      pageName: 'list',
      component: function (obj, r_instance) {
        r_instance.setRouter(obj)
      },
      _updateInSide: 1
    },
  ]
  var router = EASY_ROUTER.router;
  router._init(config);
  setTimeout(function () {
    router.replace('list', {
      id: 110
    })
  }, 6000)
}())