import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

var ak = new Vue({
  methods: {
    warn: function(str) {
      Message({
        message: str,
        type: 'warning',
        duration: 2 * 1000
      })
    },
    info: function(str) {
      Message({
        message: str,
        type: 'info',
        duration: 2 * 1000
      })
    },
    error: function(str) {
      Message({
        message: str,
        type: 'error',
        duration: 2 * 1000
      })
    },
    success: function(str) {
      Message({
        message: str,
        type: 'success',
        duration: 2 * 1000
      })
    },
    /**
     * 时间戳转化为年 月 日 时 分 秒
     * time: 传入时间
     * format：返回格式，支持自定义，但参数必须与formateArr里保持一致,为空的话则显示多久前
     */
    formatTime: function(time, format) {
      if (typeof time === 'string') {
        time = time.replace(/-/g, '/')
      }
      var formatNumber = function(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
      }
      var getDate = function(time, format) {
        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
        var returnArr = []
        var date = new Date(time)
        returnArr.push(date.getFullYear())
        returnArr.push(formatNumber(date.getMonth() + 1))
        returnArr.push(formatNumber(date.getDate()))
        returnArr.push(formatNumber(date.getHours()))
        returnArr.push(formatNumber(date.getMinutes()))
        returnArr.push(formatNumber(date.getSeconds()))
        for (var i in returnArr) {
          format = format.replace(formateArr[i], returnArr[i])
        }
        return format
      }
      var getDateDiff = function(time) {
        let r = ''
        const ft = new Date(time)
        const nt = new Date()
        const nd = new Date(nt)
        nd.setHours(23)
        nd.setMinutes(59)
        nd.setSeconds(59)
        nd.setMilliseconds(999)
        const d = parseInt((nd - ft) / 86400000)
        switch (true) {
          case d === 0:
            var t = parseInt(nt / 1000) - parseInt(ft / 1000)
            switch (true) {
              case t < 60:
                r = '刚刚'
                break
              case t < 3600:
                r = parseInt(t / 60) + '分钟前'
                break
              default:
                r = parseInt(t / 3600) + '小时前'
            }
            break
          case d === 1:
            r = '昨天'
            break
          case d === 2:
            r = '前天'
            break
          case d > 2 && d < 30:
            r = d + '天前'
            break
          default:
            r = getDate(time, 'Y-M-D')
        }
        return r
      }
      if (!format) {
        return getDateDiff(time)
      } else {
        return getDate(time, format)
      }
    },
    /*
     * message:提示消息
     * tip:标题
     * callbackFun:回调方法
     */
    confirm: function(message, tip, callbackFun) {
      MessageBox.confirm(message, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          callbackFun()
        })
        .catch(() => {})
    },
    // 校验数字输入
    loadNumber: function(e) {
      const isNumber = /^\d*$/.test(e.target.value)
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, '')
      if (!isNumber || e.target.value < 1 || e.target.value > 100) {
        this.$message.warning('请输入[1,100]区间的整数')
      }
      e.target.value = (e.target.value >= 1 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null
    },
    // 校验数字输入
    loadNumberInput: function(e, min, max) {
      const isNumber = /^\d*$/.test(e.target.value)
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, '')
      if (!isNumber || e.target.value < min || e.target.value > max) {
        this.$message.warning('请输入[' + min + ',' + max + ']区间的整数')
      }
      e.target.value = (e.target.value >= min && e.target.value <= max && e.target.value.match(/^\d*/g)[0]) || null
      return e.target.value
    },

    // 校验 0~100 的任意数字 但不可以是01 02 这种形式
    validatorNumberFlot(value) {
      if (typeof value === 'number') {
        value = value.toString()
      }
      var reg = /^(?:0|[1-9][0-9]?|100)(\.[0-9]{0,1})?$/
      if (!value.match(reg) || value > 100) {
        return false
      } else {
        return true
      }
    },

    // 数组数据转ui能识别的树形数据（必须为awaken规定格式使用，根ID必须为""）
    ArrayToTreeData: function(arrayData) {
      var result = [] // 返回结果
      var tmpMap = [] // 临时map
      // 将所有数据存入map，ID为节点id、value为节点对象
      for (let i = 0, l = arrayData.length; i < l; i++) {
        // 获取对象（必须操作原对象）
        const data = arrayData[i]
        // 数组节点指向原对象
        tmpMap[data.id] = data
      }
      // 再次循环数组
      for (let i = 0, l = arrayData.length; i < l; i++) {
        // 获取对象（必须操作原对象）
        const data = arrayData[i]
        if (data.pId) {
          if (ak.isNotNullOrEmpty(tmpMap[data.pId]) && data.id !== data.pId) {
            // 其他节点
            if (!tmpMap[data.pId].children) {
              // 如果对象子节点属性不存在，需创建
              tmpMap[data.pId].children = []
            }
            tmpMap[data.pId].children.push(data)
          } else {
            // 根节点
            result.push(data)
          }
        } else {
          if (ak.isNotNullOrEmpty(tmpMap[data.pid]) && data.id !== data.pid) {
            // 其他节点
            if (!tmpMap[data.pid].children) {
              // 如果对象子节点属性不存在，需创建
              tmpMap[data.pid].children = []
            }
            tmpMap[data.pid].children.push(data)
          } else {
            // 根节点
            result.push(data)
          }
        }
      }
      return result
    },
    // 是否为空（true是，false否）
    isNullOrEmpty: function(obj) {
      if (obj === null || undefined === obj || obj.length === 0) {
        return true
      } else {
        return false
      }
    },
    // 是否不为空（true否，false是）
    isNotNullOrEmpty: function(obj) {
      return !this.isNullOrEmpty(obj)
    },
    // 判断是否是空对象
    isEmptyObject: function(obj) {
      for (var key in obj) {
        return false
      }
      return true
    },
    // 数组去重
    uniqueArr: function(arr) {
      const result = []
      const hash = {}
      for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
          result.push(elem)
          hash[elem] = true
        }
      }
      return result
    },
    // json数组去重
    uniqueJsonArray: function(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    dateFormat: function(format, date) {
      // 格式化日期 format('yyyy-MM-dd hh:mm:ss:SS 星期w 第q季度')
      if (!date) {
        date = new Date()
      } else if (typeof date === 'string') {
        date = new Date(date)
      }
      var Week = ['日', '一', '二', '三', '四', '五', '六']
      var o = {
        'y+': date.getYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
        w: Week[date.getDay()]
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
    },
    // 验证手机号
    verifyPhone: function(phone) {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      return reg.test(phone)
    },
    // 验证邮箱
    verifyEmail: function(email) {
      var reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      return reg.test(email)
    },
    // 验证身份证
    checkCard: function(obj) {
      // 校验长度，类型
      if (this.isCardNo(obj) === false) {
        return false
      }
      // 检查省份
      if (this.checkProvince(obj) === false) {
        return false
      }
      // 校验生日
      if (this.checkBirthday(obj) === false) {
        return false
      }
      // 检验位的检测
      if (this.checkParity(obj) === false) {
        return false
      }
      return true
    },
    // 检查号码是否符合规范，包括长度，类型
    isCardNo: function(obj) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
      if (reg.test(obj) === false) {
        return false
      }
      return true
    },
    // 取身份证前两位,校验省份
    checkProvince: function(obj) {
      var vcity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }

      var province = obj.substr(0, 2)
      if (vcity[province] === undefined) {
        return false
      }
      return true
    },
    // 检查生日是否正确
    checkBirthday: function(obj) {
      var len = obj.length
      // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
      if (len === 15) {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
        const arr_data = obj.match(re_fifteen)
        const year = arr_data[2]
        const month = arr_data[3]
        const day = arr_data[4]
        const birthday = new Date('19' + year + '/' + month + '/' + day)
        return this.verifyBirthday('19' + year, month, day, birthday)
      }
      // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
      if (len === 18) {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
        const arr_data = obj.match(re_eighteen)
        const year = arr_data[2]
        const month = arr_data[3]
        const day = arr_data[4]
        const birthday = new Date(year + '/' + month + '/' + day)
        return this.verifyBirthday(year, month, day, birthday)
      }
      return false
    },
    // 校验日期
    verifyBirthday: function(year, month, day, birthday) {
      var now = new Date()
      var now_year = now.getFullYear()
      // 年月日是否合理
      if (birthday.getFullYear() === parseInt(year) && birthday.getMonth() + 1 === parseInt(month) && birthday.getDate() === parseInt(day)) {
        // 判断年份的范围（3岁到100岁之间)
        var time = now_year - parseInt(year)
        if (time >= 0 && time <= 130) {
          return true
        }
        return false
      }
      return false
    },
    // 校验位的检测
    checkParity: function(obj) {
      // 15位转18位
      obj = this.changeFivteenToEighteen(obj)
      var len = obj.length
      if (len === 18) {
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var cardTemp = 0
        for (var i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i]
        }
        var valnum = arrCh[cardTemp % 11]
        if (valnum === obj.substr(17, 1)) {
          return true
        }
        return false
      }
      return false
    },
    // 15位转18位身份证号
    changeFivteenToEighteen: function(obj) {
      if (obj.length === 15) {
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        var cardTemp = 0
        obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6)
        for (var i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i]
        }
        obj += arrCh[cardTemp % 11]
        return obj
      }
      return obj
    },
    // 获取公钥
    getPublicKey: function() {
      if (store.getters.publickey === null || store.getters.publickey === '') {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetPublicKey')
          .then(() => {})
          .catch(() => {})
      }
    },

    // 输入框特殊字符过滤
    filterJson: function(json) {
      for (var item in json) {
        var type = typeof json[item]
        if (type === 'string') {
          json[item] = this.filterParameters(json[item])
        }
      }
    },
    filterParameters: function(param) {
      param = param.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9()-._,@:-\\/])/g, '')
      param = param.replace(/[·！￥……”“‘’《》【】—？、;；*+=]/g, '')
      return param
    },
    // 事件监听
    eventListener: function(json) {
      document.addEventListener(
        'change',
        () => {
          ak.filterJson(json)
        },
        false
      )
    },
    // 密码校验
    valifyPwd: function(str, userName) {
      if (userName !== null && str.indexOf(userName) !== -1) {
        return '密码不能与用户名相同或包含用户名!'
      }

      var regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,30}')
      if (!regex.test(str)) {
        return '密码中必须包含大写字母、小写字母、数字，至少8个字符，最多32个字符!'
      }

      if (!this.isNotInKeyboardSeq(str)) {
        return '密码不能包含键盘上的规则序列'
      }

      return null
    },
    // 去除文本内容中html标签
    replaceHtmlToText(content) {
      return content
        .replace(/<[^>]+?>/g, '')
        .replace(/\s+/g, ' ')
        .replace(/ /g, ' ')
        .replace(/>/g, ' ')
        .replace(/&nbsp;/gi, '')
    },

    // 是否包含键盘规律的序列
    isNotInKeyboardSeq: function(pw) {
      const keys = [
        ['1|!', '2|@', '3|#', '4|$', '5|%', '6|^', '7|&', '8|*', '9|(', '0|)'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
      ]
      const authWordArr = pw.split('')
      // 连续次数
      var posi = []
      // 判断横向连续次数
      for (var i = 0; i < authWordArr.length; i++) {
        const compareedStr = authWordArr[i]
        var isbreak = false
        for (var j = 0; j < keys.length; j++) {
          for (var k = 0; k < keys[j].length; k++) {
            const curKey = keys[j][k].split('|')
            // 查找字符在数组中的位置
            for (const keyChild in curKey) {
              if (curKey[keyChild] === compareedStr.toLowerCase()) {
                posi.push(j * 10 + k)
                isbreak = true
                break
              }
            }
            if (isbreak) {
              break
            }
          }
          if (isbreak) {
            break
          }
        }
      }

      var cross = 0
      var maxLast = 0
      var curLast = 0
      var xcross = 0
      for (i = 0; i < posi.length; i++) {
        if (i === 0) {
          continue
        }
        const prev = posi[i - 1]
        const cur = posi[i]
        // 判断横向上连续的字符串
        if (prev + 1 === cur) {
          curLast++
          cross++
          if (curLast > maxLast) {
            maxLast = curLast
          }
        } else {
          curLast = 0
        }
      }
      xcross = cross

      // 根据排列获得分组
      const group = posi.length - 1
      var xpercent = cross / group
      // 匹配率大于0.8
      if (xpercent > 0.8) {
        return false
      }

      cross = 0
      maxLast = 0
      curLast = 0
      for (i = 0; i < posi.length; i++) {
        if (i === 0) {
          continue
        }
        const prev = posi[i - 1]
        const cur = posi[i]
        // 判断纵向上连续的字符串
        if (prev + 10 === cur) {
          curLast++
          cross++
          if (curLast > maxLast) {
            maxLast = curLast
          }
        } else {
          curLast = 0
        }
      }

      const ypercent = cross / group
      // 匹配率大于0.8
      if (ypercent > 0.8) {
        return false
      }

      const totalPercent = (xcross + cross) / group
      if (totalPercent > 0.5) {
        return false
      }

      return true
    },
    getFathersById(id, data, prop = 'id') {
      var arrRes = []
      const rev = (data, nodeId) => {
        for (var i = 0, length = data.length; i < length; i++) {
          const node = data[i]
          if (node[prop] === nodeId) {
            arrRes.unshift(node[prop])
            return true
          } else {
            if (node.children && node.children.length) {
              if (rev(node.children, nodeId)) {
                arrRes.unshift(node[prop])
                return true
              }
            }
          }
        }
        return false
      }
      rev(data, id)
      return arrRes
    },
    handleId(arr, type) {
      if (type === 1) {
        if (arr.length) {
          return arr[arr.length - 1]
        } else return ''
      } else {
        if (arr.length) {
          const newArr = []
          arr.some(item => {
            newArr.push(item[item.length - 1])
          })
          return newArr
        } else return []
      }
    },
    /**
     * 使用永中云 预览文档
     * @param {Object} that 当前this对象
     * @param {String} fileURL 文件路径
     * @returns 返回 Promise 对象
     */
    yongZhongCloud(that, fileURL) {
      that.$axios.defaults.headers.common['fcsreferer'] = 'http://online.udaclass.com/'
      const res = that.$axios.get(`http://api.yozocloud.cn/getPreview?k=54117540497562009677035&url=http://online.udaclass.com/${fileURL}`)

      return res
    },

    /**
     * 日期格式转字符串格式
     * @param {String,Date} dateParam 日期
     * @param {String} delimiter 日期分隔符
     * @returns {String} 日期
     */
    fnDateToString(dateParam, delimiter = '-') {
      let d = new Date(dateParam)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      return `${year}${delimiter}${month < 10 ? '0' + month : month}${delimiter}${day < 10 ? '0' + day : day}`
    }
  }
})

export default ak
