import { addClass, removeClass, toggleClass } from './classUtil';
import PublicArea from './PublicArea';

/**
 * 参数对象转换为字符串
 * @param params
 */
function formatData(value) {
  return value < 10 ? '0' + value : value;
}
function objToParamStr(paramObj) {
  let paramStr = '';
  function getValue() {
    for (const key of Object.keys(paramObj)) {
      if (paramObj[key] && !Array.isArray(paramObj[key]) || (Array.isArray(paramObj[key]) && paramObj[key].length)) {
        if (paramObj[key] instanceof Date) { // check type is Date
          const year = paramObj[key].getFullYear(),
            month = formatData(paramObj[key].getMonth() + 1),
            day = formatData(paramObj[key].getDate()),
            hour = formatData(paramObj[key].getHours()),
            minute = formatData(paramObj[key].getMinutes()),
            second = formatData(paramObj[key].getSeconds()),
            str = '-',
            pot = ':';
          paramObj[key] = year + str + month + str + day + ' ' + hour + pot + minute + pot + second;
        }
        paramStr += '&';
        paramStr += key;
        paramStr += '=';
        paramStr += encodeURIComponent(paramObj[key]);
      }
    }
    return paramStr;
  }
  paramStr = getValue();
  return paramStr.substring(1);
}


/**
 * 过滤对象中空值数据
 * @param paramObj
 */
function objToObj(paramObj) {
  const paramNewObj = {};
  function getObj() {
    for (const key of Object.keys(paramObj)) {
      if (paramObj[key]) {
        paramNewObj[key] = paramObj[key];
      }
    }
    return paramNewObj;
  }
  return getObj();
}

/**
 * 获取匹配字段
 */
function getParam(parConfig, eleDefine, eleInfo) {
  const parConfigData = parConfig.data.content,
    eleDefineData = eleDefine.data.content,
    eleInfoData = eleInfo.data.content,
    fields = [],
    inputFields = [];
  if (!parConfigData || !parConfigData.length) {
    return false;
  }
  parConfigData.forEach((value, index) => {
    if (!eleDefineData[value.elementCode]) {
      console.error(`error, fieldConfigCode: ${value.fieldConfigCode} can not find elementInfoCodes`);
      return false;
    }
    if (!value.extraParams) {
      console.error(`error, fieldConfigCode: ${value.fieldConfigCode} can not find extraParams`);
      return false;
    }
    try {
      JSON.parse(value.extraParams)
    } catch (error) {
      console.error(value.extraParams, 'is not json, ', 'fieldConfigCode is', value.fieldConfigCode, );
      return false;
    }
    const elementCode = value.elementCode,
      fieldConfigCode = value.fieldConfigCode,
      elementInfoCodes = eleDefineData[elementCode].elementInfoCodes,
      event = eleDefineData[elementCode].event,
      extraParams = JSON.parse(value.extraParams),
      len = elementInfoCodes.length;
    value.extraParams = [];
    for (let i = 0; i < len; i++) {
      value.extraParams[i] = {};
      if ('required' in extraParams) {
        value.required = extraParams.required;
        value.extraParams[i].required = extraParams.required;
      }
      if ('detailLinkVisiable' in extraParams) {
        value.detailLinkVisiable = extraParams.detailLinkVisiable;
      }
      if ('area' in extraParams) {
        value.area = extraParams.area;
      }
    }
    for (let i = 1; i < len + 1; i++) {
      if (!extraParams) {
        console.error(`error, extraParams in fieldConfigCode: ${fieldConfigCode} is ${extraParams}`);
        return false;
      }
      Object.keys(extraParams).forEach((key) => {
        if (key.indexOf(i) > 0) {
          const param = key.replace(i, '');
          value.extraParams[i - 1][param] = extraParams[key];
        }
      });
      if (value.extraParams[i - 1]['inputKey']) {
        const inputKey = value.extraParams[i - 1]['inputKey'],
          index = inputKey.indexOf('.'),
          len = inputKey.length;
        inputFields.push({
          key: inputKey.slice(0, index),
          name: inputKey.slice(index + 1, len),
          field: value.extraParams[i - 1]['field']
        });
      }
      Object.keys(eleInfoData[elementInfoCodes[i - 1]]).forEach((key) => {
        value.extraParams[i - 1][key] = eleInfoData[elementInfoCodes[i - 1]][key];
      });
      //              self.requestList.push(value.extraParams[i - 1]);
      const type = value.extraParams[i - 1].controlType;
      if (type === 'checkbox' || type === 'radio') {
        value.extraParams[i - 1].value = [];
      } else if (type === 'select') {
        value.extraParams[i - 1].value = '';
        value.extraParams[i - 1].text = '';
      } else {
        value.extraParams[i - 1].value = '';
      }
      // value.extraParams[i - 1].showName = value.showName;
    }
    value.event = event;
    fields.push(value);
  });
  return {
    field: fields,
    inputKey: inputFields
  };
}

// 计算tab宽度
function calTab() {
  const topdocument = window.top.document,
    wrapWidth = topdocument.querySelector('.tab-wrap').offsetWidth,
    element = topdocument.querySelectorAll('#tabList li');
  let tabWidth = 0;
  Object.keys(element).forEach((index) => {
    const liWidth = element[index].offsetWidth + 2;
    tabWidth += liWidth;
  });
  // console.log(wrapWidth, tabWidth);
  topdocument.querySelector('#tabList').style.width = `${tabWidth}px`;
  if (tabWidth > wrapWidth) {
    // console.log('success');
    addClass(topdocument.querySelector('.tab-wrap'), 'is-scroll');
    const scrollWidth = topdocument.querySelector('.tab-scroll').offsetWidth,
      x = tabWidth - scrollWidth;
    topdocument.querySelector('#tabList').style.marginLeft = `${-x}px`;
  }
}

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

// 获取data-link和data-title生成新的tab和iframe
function urlRedirect(targetLink, targetTitle) {
  if (targetLink && targetTitle) {
    if (targetLink === "undefined") {
      return false;
    }
    const topdocument = window.top.document,
      iframeContent = topdocument.querySelector('#iframeContent'),
      iframeList = iframeContent.getElementsByTagName('iframe'),
      newIframe = document.createElement('iframe'),
      tabList = topdocument.querySelector('#tabList');
    // 是否已经存在相同iframe
    let sameFlag = false;
    for (let i = iframeList.length - 1; i >= 0; i--) {
      if (iframeList[i].getAttribute('data-url') === targetLink) {
        // 存在相同的iframe
        removeClass(iframeList[i], 'hide');
        iframeList[i].src = targetLink;
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
      calTab();
    }

    // 显示选中的toptab和iframe
    selectTabAndIframe(targetLink);
  }
}

// 获取高度
function adaptHeight() {
  if (document.querySelectorAll('.page-header')[0] && document.querySelectorAll('.table-opr')[0] && document.querySelectorAll('.pagination')[0]) {
    const winHeight = window.innerHeight,
      pageHeader = document.querySelectorAll('.page-header')[0].offsetHeight,
      tableOprHeight = document.querySelectorAll('.table-opr')[0].offsetHeight,
      pageHeight = document.querySelectorAll('.pagination')[0].offsetHeight,
      list = document.querySelector('#list'),
      advanceSearch = document.querySelector('.advance-search'),
      asbd = document.querySelector('#asBd');
    // console.log(winHeight,pageHeader, tableOprHeight, pageHeight);
    let tableHeight = null;
    tableHeight = winHeight - pageHeader - tableOprHeight - pageHeight - 1;
    list.style.height = winHeight + 'px';
    document.querySelectorAll('.fix-table-wrap')[0].style.height = tableHeight + 'px';
    if (advanceSearch) {
      advanceSearch.style.height = winHeight + 'px';
    }
    if (asbd) {
      asbd.style.maxHeight = winHeight - 75 + 'px';
    }
  }

}

// 生成高度
function changeHeight() {
  if (document.querySelectorAll('.page-header')[0] && document.querySelectorAll('.table-opr')[0] && document.querySelectorAll('.pagination')[0]) {
    const winHeight = window.innerHeight,
    pageHeader = document.querySelectorAll('.page-header')[0].offsetHeight,
    tableOpr = document.querySelectorAll('.table-opr')[0].offsetHeight,
    pagination = document.querySelectorAll('.pagination')[0].offsetHeight,
    unit = 'px',
    realHeight = (winHeight - pageHeader - tableOpr - pagination) + unit;
  document.querySelectorAll('.fix-table-wrap')[0].style.height = realHeight;
  }
}

// 高级搜索
function advanceSearch() {
  const listPage = document.querySelector('#list'),
    miniSearch = document.querySelector('#miniSearch'),
    advanceSearch = document.querySelector('#advanceSearch'),
    asClose = document.querySelector('#asClose');
  // console.log(winHeight,listPage,advanceSearch);
  advanceSearch.addEventListener('click', () => {
    toggleClass(listPage, 'opened');
    toggleClass(miniSearch, 'hide');
  });
  asClose.addEventListener('click', () => {
    toggleClass(listPage, 'opened');
    toggleClass(miniSearch, 'hide');
  });
}

function initTableWidth() {
  const headerDiv = document.querySelectorAll('.el-table__header-wrapper')[0];
  // console.log(headerDiv);
}


/*   通过时间戳生成对应的时间格式
 *   params:zeit 可输入，默认为当前的时间
 *          time 可输入，对应的输出格式
 *   return string
 * */
function dateFormat(zeit, time) {
  var date = zeit ? new Date(zeit) : null;
  if (date !== null) {
    var strYear,
      strMonth,
      strDate,
      strHour,
      strMinute,
      strSecond,
      dateFormat,
      str1 = '-',
      str2 = ':';
    strMonth = formatData(date.getMonth() + 1);
    strDate = formatData(date.getDate());
    strYear = formatData(date.getFullYear());
    strHour = formatData(date.getHours());
    strMinute = formatData(date.getMinutes());
    strSecond = formatData(date.getSeconds());
    switch (time) {
      case 'notime':
        dateFormat = strYear + str1 + strMonth + str1 + strDate;
        break;
      case 'month':
        dateFormat = strYear + str1 + strMonth;
        break;
      case 'day':
        dateFormat = strYear + str1 + strMonth + str1 + strDate;
        break;
      case 'withoutSecond':
        dateFormat = strYear + str1 + strMonth + str1 + strDate + ' ' + strHour + str2 + strMinute;
        break;
      case 'justTime':
        dateFormat = strHour + str2 + strMinute + str2 + strSecond;
        break;
      default:
        dateFormat = strYear + str1 + strMonth + str1 + strDate + ' ' + strHour + str2 + strMinute + str2 + strSecond;
    }
    return dateFormat;
  }
  return null;
}

//返回两位小数并加上千分位，
function moneyFormat(num, back) {
  if (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
  if (back === 'null') {
    return null;
  }
  return '0.00';
}

//数字转字符串
function NumtoStr(val) {
  return isNaN(val) ? val : val.toString();
}

//获取url键的value
function getUrl(key) {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`),
    result = window.location.search.substr(1).match(reg);
  // console.log(result);
  return result ? decodeURI(result[2]) : null;
}

function getParamsFromURL(URL) {
  var paramObject = {};
  var paramStr = URL.substring(1);
  var params = paramStr.split('&');
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');
    paramObject[pair[0]] = pair[1];
    paramObject[pair[0]] = decodeURI(paramObject[pair[0]]);
  }
  // console.log(paramObject);
  return paramObject;
}

function dealInputKey(inputKeys, cb) {
  const inputKeyArray = inputKeys.split(',');
  inputKeyArray.forEach((inputKey) => {
    const inputKeyArr = inputKey.split('.');
    PublicArea.addSetObservers(inputKeyArr[0], (outData) => {
      cb(inputKeyArr[1], outData);
    });
  });
}

export { objToParamStr, objToObj, getParam, urlRedirect, adaptHeight, changeHeight, advanceSearch, initTableWidth, dateFormat, moneyFormat, NumtoStr, getUrl, getParamsFromURL, dealInputKey };
