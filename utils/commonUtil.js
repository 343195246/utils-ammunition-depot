/**
 * 从图片地址中获取 ossid
 */
export function imgUrlToOssId(str) {
  return str.slice(str.indexOf('ossId=') + 'ossId='.length)
}

/**
 * 计算页数
 * @param {Number} pageSize 每页显示条数
 * @param {Number} total 总条目数
 * @returns {Number} 返回页数
 */
export function countNumberPages(pageSize, total) {
  const result = Math.ceil(total / pageSize)

  return result
}

/**
 * 格式化日期
 * @param {String} params 日期
 * @returns 返回格式化后的日期 ( yyyy-MM-dd )
 */
export function formatterDate(params) {
  if (typeof params === 'string') {
    params = params.replace(/-/g, '/')
  }
  const d = new Date(params)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  const result = `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`
  return result
}
/**
 * 格式化日期时间
 * @param {String} params 日期
 * @returns 返回格式化后的日期 ( yyyy-MM-dd )
 */
export function formatterDateTime(params) {
  if (typeof params === 'string') {
    params = params.replace(/-/g, '/')
  }
  const d = new Date(params)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hh = d.getHours()
  const mm = d.getMinutes()
  const ss = d.getSeconds()

  const result = `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day} ${hh <= 9 ? '0' + hh : hh}:${mm <= 9 ? '0' + mm : mm}:${ss <= 9 ? '0' + ss : ss}`
  return result
}

/**
 * 封装 Element---message 组件 确认删除
 * @param {Object} that Vue对象
 * @param {Function} callback 回调函数
 */
export function commonMessage(that, callback, description = '此操作将永久删除该文件') {
  that
    .$confirm(`${description}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      callback()
    })
    .catch(() => {
      that.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
}

/**
 * 批量移除数组对象
 * @param {Array} data 原数据
 * @param {Object} target 目标对象
 */
export function bulkRemovalArrObj(data, target) {
  for (const key in data) {
    for (const item of target) {
      if (data[key].id === item.id) {
        data.splice(key, 1)
      }
    }
  }
  return data
}

/**
 * 获取数组对象中的某个字段的集合数组
 * @param {Array} arrData 原数据
 * @param {String} keyName 字段名
 * @returns 返回目标字段的集合数组
 */
export function arrObjItemtoArr(arrData, keyName) {
  const newArr = []
  for (const key in arrData) {
    newArr.push(arrData[key][keyName])
  }
  return newArr
}

/**
 * 获取数组对象中的某个字段的字符串拼接结果
 * @param {Array} arrData 原数据
 * @param {String} keyName 字段名
 * @returns 返回目标字段的拼接结果字符串
 */
export function arrObjItemToStr(arrData, keyName) {
  const idsArr = []
  for (const item of arrData) {
    idsArr.push(item[keyName])
  }
  const str = idsArr.join(',')

  return str
}

/**
 * 树形数据 转 一维数组
 * @param {Tree} treeNodes 树形数据
 * @returns {Array} 一维数组
 */
export function treetoArr(treeNodes) {
  const newArr = []
  fnRecursion(treeNodes, newArr)

  function fnRecursion(treeNodes, arr) {
    for (const treeNodesItem of treeNodes) {
      // console.log('treeNodesItem :>> ', treeNodesItem)
      arr.push(treeNodesItem)
      if (treeNodesItem.children) {
        fnRecursion(treeNodesItem.children, newArr)
      }
    }
    return arr
  }
  return newArr
}

/**
 * 取出区域内所有img的src
 */
export function getImg(html) {
  var imgReg = /<img.*?(?:>|\/>)/gi
  // 匹配src属性
  var srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i
  var arr = html.match(imgReg)
  const imgs = []
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      var src = arr[i].match(srcReg)[1]
      imgs.push(src)
    }
  }
  return imgs
}

/**
 * 提示弹窗: 删除
 * @param {String} tips 提示语
 * @param {Function} callback 确定删除执行的回调函数
 */
export function messageBoxDel(that, tips, callback) {
  that
    .$confirm(tips, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      callback()
    })
    .catch(() => {
      that.$message({
        type: 'info',
        message: '已取消操作'
      })
    })
}

// 计算百分比
export function calculatePercentage(num1, num2) {
  return Math.round((num1 / num2) * 10000) / 100.0
}

// 设置iframe文档高度
export function setIframeHeight(iframe) {
  if (iframe) {
    var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow

    if (iframeWin.document.body) {
      iframe.height = iframeWin.document.body.scrollHeight
    }
  }
}

// timeout循环定时器
export function commonTimeOut(that, timerName, second, callbackFun) {
  // 初始化timeout定时器，防止定时器重叠
  clearTimeout(that[timerName])
  that[timerName] = setTimeout(() => {
    callbackFun()
    // 循环调用函数自身，以达到循环的效果
    commonTimeOut(that, timerName, second, callbackFun)
  }, second)
}

// 日期比较方法
export function compareDate(s1, s2) {
  return new Date(s1) >= new Date(s2)
}

// bytes自适应转换到KB,MB,GB
export function formatFileSize(fileSize) {
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < 1024 * 1024) {
    let temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < 1024 * 1024 * 1024) {
    let temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    let temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}

// 校验是否为正整数
export function validPositiveInteger(num) {
  const re = /^[0-9]+$/
  const numBoolean = re.test(num)
  return numBoolean
}

/**
 * 函数防抖 (只执行最后一次点击)
 * 其原理就第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，
 * 它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有任何意义。
 * 然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器，然后延迟一定时间再执行。
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
  let delay = t || 500
  let timer
  return function() {
    // 返回一个闭包
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 函数节流
 * 规定在一个单位时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效
 * 其原理是用时间戳来判断是否已到回调该执行时间，记录上次执行的时间戳，然后每次触发事件执行回调，
 * 回调中判断当前时间戳距离上次执行时间戳的间隔是否已经到达 规定时间段，如果是，则执行，并更新上次执行的时间戳，如此循环
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last
  let timer
  let interval = t || 500
  return function() {
    // 返回一个函数，形成闭包，持久化变量
    let args = arguments
    /**
     * 记录当前函数触发的时间
     * +new Date()这个操作是将该元素转换成Number类型
     * 等同于Date.prototype.getTime()
     */
    let now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // 记录上一次函数触发的时间
        last = now
        // 修正this指向问题
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
    console.log(now)
  }
}

/**
 * 数组去重 (map方式)
 * @param {Array} arr 要去重的数组
 * @returns {Array} 去重之后的数组
 */
export function arrayNonRepeatfy(arr) {
  let map = new Map()
  let array = new Array() // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      // 如果有该key值
      map.set(arr[i], true)
    } else {
      map.set(arr[i], false) // 如果没有该key值
      array.push(arr[i])
    }
  }
  return array
}
