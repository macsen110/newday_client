// 内嵌页面生成data-link方法
// import { addClass, removeClass } from './classUtil';
import { urlRedirect } from '../api/Utils';

// 监听data-link和data-title
document.addEventListener('click', (event) => {
  const target = event.target,
    // 是否存在data-link
    targetLink = target.getAttribute('data-link') || '',
    targetTitle = target.getAttribute('data-title') || '';
  // 查看是否含有data-link和data-title
  urlRedirect(targetLink, targetTitle);
});

// iframe页面刷新
window.onload = () => {
  if (document.querySelector('#pageRefresh')) {
    document.querySelector('#pageRefresh').addEventListener('click', () => {
      window.location.reload();
    });
  }
};
