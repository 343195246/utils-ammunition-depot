/**
 * 函数节流，事件后触发
 * 
 * 事件频繁触发的情况下，在指定时间内只执行一次任务。比如我的鼠标在频繁滚动，滚动事件会一直触发，但是在每 300ms 之内只处理一次事件。一般来说我们会处理这 300ms 内最后一次触发的事件，也就是下文的 throttleAfter；如果我们处理这 300ms 内第一次触发的事件，就相当于技能CD，300 ms 就成了技能施放的冷却时间。
 * 
 * @param {Function} cb
 * @param {Number} interval
 * @param params
 * @return {Function}
 * @example window.onscroll = throttleAfter(cb)
 */
function throttleAfter(cb, interval = 300, ...params) {
  let cd = false
  return function (e) {
    if (cd) return
    cd = true
    setTimeout(() => {
      cd = false
      cb(e, ...params)
    }, interval)
  }
}

/**
 * 函数防抖
 * 
 * 事件频繁触发的情况下，事件被触发指定时间后才执行回调，如果事件在这指定时间内又被触发，则重新计时。比如你在搜索框啪啪啪一直打字是不会处理你的输入事件，直到你停下的时间到了 300ms 时，客户端会将你输入的文字发送给服务器。
 * 
 * @param {Function} cb
 * @param {Number} interval
 * @param params rest参数列表
 * @return {Function}
 * @example input.oninput = debounce(cb， 200， param); function cb(e, param) {};
 */
export function debounce(cb, interval = 300, ...params) {
  let timer = null
  return function (e) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb(e, ...params)
    }, interval)
  }
}

export default {
  // 函数节流
  throttleAfter,

  // 函数防抖
  debounce,
}