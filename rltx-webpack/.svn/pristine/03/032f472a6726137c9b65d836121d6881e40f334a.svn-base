// 内嵌页面生成data-link方法
import { addClass, removeClass } from '../../api/classUtil';

// 展示tab和iframe
function selectTabAndIframe(link) {
  const topdocument = window.top.document,
    tabList = topdocument.getElementById('tabList').getElementsByTagName('li'),
    iframes = topdocument.getElementById('iframeContent').getElementsByTagName('iframe'),
    navItemLiList = topdocument.querySelectorAll('.nav-list-itemli');
  for (let i = tabList.length - 1; i >= 0; i--) {
    if (tabList[i].getAttribute('data-url') === link) {
      addClass(tabList[i], 'active');
    } else {
      removeClass(tabList[i], 'active');
    }
  }
  for (let k = iframes.length - 1; k >= 0; k--) {
    if (iframes[k].getAttribute('data-url') === link) {
      removeClass(iframes[k], 'hide');
    } else {
      addClass(iframes[k], 'hide');
    }
  }
  for (let j = navItemLiList.length - 1; j >= 0; j--) {
    if (navItemLiList[j].getAttribute('data-link') === link) {
      addClass(navItemLiList[j], 'active');
    } else {
      removeClass(navItemLiList[j], 'active');
    }
  }
}

// 监听data-link和data-title
document.addEventListener('click', (event) => {
  const topdocument = window.top.document,
    target = event.target,
    // 是否存在data-link
    targetLink = target.getAttribute('data-link') || '',
    targetTitle = target.getAttribute('data-title') || '',
    iframeContent = topdocument.querySelector('#iframeContent');
  // 查看是否含有data-link和data-title
  if (targetLink || targetTitle) {
    const iframeList = iframeContent.getElementsByTagName('iframe'),
      newIframe = document.createElement('iframe'),
      tabList = topdocument.querySelector('#tabList');
    // 是否已经存在相同iframe
    let sameFlag = false;
    for (let i = iframeList.length - 1; i >= 0; i--) {
      if (iframeList[i].getAttribute('data-url') === targetLink) {
        // 存在相同的iframe
        removeClass(iframeList[i], 'hide');
        sameFlag = true;
        break;
      }
    }
    if (!sameFlag) {
      const tab = document.createElement('li'),
        span1 = document.createElement('span'),
        span2 = document.createElement('span');
      // tab.className = 'col-md-3 mark';
      tab.setAttribute('data-url', targetLink);
      tab.className = 'page-tab-item';
      span1.className = 'ellipsis page-tab-ellipsis-name';
      span1.innerHTML = targetTitle;
      span2.className = 'page-tab-close';
      span2.innerHTML = 'x';
      tab.appendChild(span1);
      tab.appendChild(span2);
      tabList.appendChild(tab);
      for (let j = iframeList.length - 1; j >= 0; j--) {
        removeClass(iframeList[j], 'active');
      }
      newIframe.src = targetLink;
      newIframe.setAttribute('data-url', targetLink);
      newIframe.className = 'iframe';
      iframeContent.appendChild(newIframe);
    }

    // 显示选中的toptab和iframe
    selectTabAndIframe(targetLink);
  }
});
