

/**
 * 防抖debounce:所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，
 * 如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
 *
 * @param {Function} func
 * @param {Number} wait 等待的毫秒数
 * @returns {Function} 添加防抖效果之后的函数
 */
function debounce(func, wait) {
  let timeoutId = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!!timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);  //给func绑定this以及参数
    }, wait);
  }
}

//节流throttle:所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
function throttle(func, wait) {

}