 /**
 * Created by zhangyc on 2017/6/19.
 */

/**
 * 是否还有该class
 * @param obj dom对象
 *        cls class对象字段
 */
function hasClass(obj, cls) {
  const a = '(\\s|^)',
    b = '(\\s|$)';
  return obj.className.match(new RegExp(a + cls + b));
}

/**
 * 删除class字段
 * @param obj dom对象
 *        cls class对象字段
 */
function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    const a = '(\\s|^)',
      b = '(\\s|$)',
      reg = new RegExp(a + cls + b);
    obj.className = obj.className.replace(reg, ' ');
  }
}

/**
 * 增加class字段
 * @param obj dom对象
 *        cls class对象字段
 */
function addClass(obj, cls) {
  if (!hasClass(obj, cls)) {
    const cn = obj.className,
      space = ' ';
    if (cn && cn[cn.length - 1] === ' ') {
      obj.className += cls;
    } else if (cn === '') {
      obj.className = cls;
    } else {
      obj.className += space + cls;
    }
  }
}

function toggleClass(ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls);
  } else {
    addClass(ele, cls);
  }
}

export { hasClass, addClass, removeClass, toggleClass };
