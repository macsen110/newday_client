;(function() {
  window.addEventListener("sw.update", function (reg)  {
    if (window.__swConfig.swUpdateCb) window.__swConfig.swUpdateCb(reg);
    else confirmRefreash(window.__swConfig.updateReload);
  });
var dfdPrompt = null;
var button = document.getElementById('btn');
  // window.addEventListener("beforeinstallprompt", function(dfdPrompt) {
  //   dfdPrompt.prompt();
  //   // 监控用户的安装行为
  //   dfdPrompt.userChoice.then(function(choiceResult) {
  //     console.log(choiceResult.outcome);
  //   });
  //   return false;
  // });
  function confirmRefreash(shoouldReload, msg) {
    if (!shoouldReload) return;
    if (shoouldReload == 2) return location.reload()
    msg = msg || "资源有更新,是否更新?";
    var _confirm = window.confirm(msg);
    if (_confirm) return location.reload();
  }
  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0, max = rawData.length; i < max; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribe(serviceWorkerReg) {
    serviceWorkerReg.pushManager.subscribe({ // 2. 订阅
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BKHC0w2c7ml3tjiqgYd27jUCrEKqhzZ3p5-Uhne7Y-HPjadkOo5nWnUNC72lxPlQGgB3yMKHZXC3RyFA6wlR5DE')
    })
    .then(function (subscription) {
      console.log(1111)
      console.log(JSON.stringify(subscription))
        // 3. 发送推送订阅对象到服务器，具体实现中发送请求到后端api
        //sendEndpointInSubscription(subscription);
    })
    .catch(function () {
        if (Notification.permission === 'denied') {
            // 用户拒绝了订阅请求
        }
    });
}
  function swRegister() {
    navigator.serviceWorker
      .register("./service-worker.js?v="+window.__swConfig.version, { scope: "./" })
      .then(function(reg) {
        subscribe(reg)
        reg.onupdatefound = function() {
          var installingWorker = reg.installing;
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  var event = document.createEvent("Event");
                  event.initEvent("sw.update", true, true);
                  reg.update().then(() => window.dispatchEvent(event, reg));
                }
                break;
            }
          };
        };
        reg.showNotification('Hello World!');
      })
      .catch(function(e) {
        console.error("Error during service worker registration:", e);
      });
  }
  function swRemove() {
    if (!window.__swConfig.use) {
      return navigator.serviceWorker
        .getRegistrations()
        .then(function(registrations) {
          if (registrations.length < 1) return;
          for (var i = 0; i < registrations.length; i++) {
            registrations[i].unregister();
          }
          if (window.__swConfig.unstalledReload) confirmRefreash(__swConfig.unstalledReload);
        });
    }
  }
  if ("serviceWorker" in navigator) {
    if (window.__swConfig.use) swRegister();
    else swRemove();
  }


window.addEventListener('beforeinstallprompt', function (e) {
    // 存储事件
    dfdPrompt = e;
    // 显示按钮
    button.style.visibility = 'visible';
    // 阻止默认事件
    e.preventDefault();
    return false;
});

button.addEventListener('click', function (e) {
    if (dfdPrompt == null) {
        return;
    }
    // 通过按钮点击事件触发横幅显示
    dfdPrompt.prompt();
    // 监控用户的安装行为
    dfdPrompt.userChoice.then(function (choiceResult) {
        alert(choiceResult.outcome);
    });
    // 隐藏按钮
    button.style.display = 'hidden';
    dfdPrompt = null;
});
}());
