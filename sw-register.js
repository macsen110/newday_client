;(function() {
  window.addEventListener("sw.update", function (reg)  {
    if (window.__swConfig.swUpdateCb) window.__swConfig.swUpdateCb(reg);
    else confirmRefreash(window.__swConfig.updateReload);
  });
  window.addEventListener("beforeinstallprompt", function(dfdPrompt) {
    dfdPrompt.prompt();
    // 监控用户的安装行为
    dfdPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);
    });
    return false;
  });
  function confirmRefreash(shoouldReload, msg) {
    if (!shoouldReload) return;
    if (shoouldReload == 2) return location.reload()
    msg = msg || "资源有更新,是否更新?";
    var _confirm = window.confirm(msg);
    if (_confirm) return location.reload();
  }
  function swRegister() {
    navigator.serviceWorker
      .register("./service-worker.js?v="+window.__swConfig.version, { scope: "./" })
      .then(function(reg) {
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
}());
