/**
 * 时间格式过滤
 * @param {*} time
 * time 单位为秒的时间戳
 */

export function formatTime(time) {
  if (isNaN(time)) return
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  return `${d.getFullYear()}年${d.getMonth() +
    1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}

/**
 * 获取星期
 * @param {*} time
 * time可以为时间戳或日期格式 例如：2019/01/10
 */

export function getWeekday(time) {
  const d = new Date(time)
  const weekArr = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const index = d.getDay()
  return weekArr[index]
}

/**
 * 数组去重
 * ES6的方法
 * @param {*} arr
 */

export function uniqueArr(arr) {
  return Array.from(new Set(arr)) // 或者[...new Set(arr)]
}

/**
 * 数组去重
 * ES5的方法
 */
export function unique(arr) {
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

/**
 * 获取url的？后面的参数
 * @param {*} name
 */

export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  if (window.location.href.split('?')[1] !== undefined) {
    let r = window.location.href.split('?')[1].match(reg)
    if (r === undefined && window.location.href.split('?').length > 2) {
      r = window.location.href.split('?')[2].match(reg)
    }
    if (r !== null) return decodeURI(r[2])
    return null
  }
}

/**
 * 深拷贝
 */

export const deepCopy = source => {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepCopy(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * 随机数范围
 * 不含小数，在整数内取值
 */

export function randNum(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

/**
 * 金额转千分位
 * str 字符串类型
 */

export function replaceMoney(str) {
  return String(str).replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
}

/**
 * 万能的判断类型方法
 * obj 类型 Number, String等 首字母大写
 */

export function typeFn(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 获取随机颜色
 * 无参数
 */

export function RandomColor() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
}

/**
 * 单行写一个评级组件
 * 定义一个变量rate是1到5的值
 */

export const star = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)

/**
 * 时间戳转日期格式
 * @param {*} num
 * num 为时间戳
 */
export const formatDate = num => {
  const oDate = new Date(num)
  const oYear = oDate.getFullYear()
  const oMonth = oDate.getMonth() + 1
  const oDay = oDate.getDate()
  const oHour = oDate.getHours()
  const oMin = oDate.getMinutes()
  const oSen = oDate.getSeconds()
  const oTime =
      oYear +
      '-' +
      getzf(oMonth) +
      '-' +
      getzf(oDay) +
      ' ' +
      getzf(oHour) +
      ':' +
      getzf(oMin) +
      ':' +
      getzf(oSen) // 最后拼接时间
  return oTime
}

// 补0操作
function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

/**
 * 带有上午，下午，晚上的时间格式
 * @param {*} obj
 * time为妙的时间戳
 */
export const formatPayTime = obj => {
  const time = obj
  if (!time) return
  const lastTime = new Date(time * 1000)
  const years = lastTime.getFullYear()
  let month = lastTime.getMonth() + 1
  let dates = lastTime.getDate()
  let hours = lastTime.getHours()
  let min = lastTime.getMinutes()
  let second = lastTime.getSeconds()
  let oas = ''
  if (lastTime.getHours() < 12) {
    oas = '上午'
  } else if (lastTime.getHours() > 12 && lastTime.getHours() <= 18) {
    oas = '下午'
  } else {
    oas = '晚上'
  }

  month < 10 ? (month = '0' + month) : month
  dates < 10 ? (dates = '0' + dates) : dates
  hours < 10 ? (hours = '0' + hours) : hours
  min < 10 ? (min = '0' + min) : min
  second < 10 ? (second = '0' + second) : second
  return `${years}/${month}/${dates} ${oas} ${hours}:${min}:${second}`
}

/**
 * 秒转换时分秒
 * @param {*} seconds
 * 例如将电影的总秒数转为时分秒显示
 */
export const secondsToHMS = seconds => {
  if (seconds < 0) return false
  let theTime = parseInt(seconds)
  let theTime1 = 0
  let theTime2 = 0
  if (theTime >= 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 >= 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  const result = `${getzf(theTime2)}:${getzf(theTime1)}:${getzf(theTime)}`
  return result
}

/**
 * 设备检测
 */

export const BrowserInfo = {
  isAndroid: Boolean(navigator.userAgent.match(/android/gi)), // 检测是否为安卓设备
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)), // 检测是否为苹果设备
  isIpad: Boolean(navigator.userAgent.match(/ipad/gi)), // 检测是否为ipad设备
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)) // 检测是否是微信
}

/**
 * 容量单位转换 bytes--kb
 * 参数为字节 byte
 * 1024byte = 1kb;1024Kb = 1Mb;1024Mb = 1GB
 */

export function bytesToSize(bytes) {
  if ((bytes >> 30) & 0x3ff) {
    bytes =
      (bytes >>> 30) + '.' + String(bytes & (3 * 0x3ff)).substr(0, 2) + 'GB'
  } else if ((bytes >> 20) & 0x3ff) {
    bytes =
      (bytes >>> 20) + '.' + String(bytes & (2 * 0x3ff)).substr(0, 2) + 'MB'
  } else if ((bytes >> 10) & 0x3ff) { bytes = (bytes >>> 10) + '.' + String(bytes & 0x3ff).substr(0, 2) + 'KB' } else if ((bytes >> 1) & 0x3ff) bytes = (bytes >>> 1) + 'Bytes'
  else bytes = bytes + 'Byte'
  return bytes
}

/**
 * 函数节流
 * @param {*} func
 * @param {*} delay
 */

export const throttle = (func, delay) => {
  let lastCall = new Date()
  return function(...args) {
    const now = new Date()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return func.apply(this, args)
  }
}

/**
 * Cookies读取与设置
 * config 是自己写的配置文件
 */

// import Cookies from 'js-cookie'
// export const TOKEN_KEY = 'token'

// export const setToken = token => {
//   Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 }) // 默认cookie保存1天
// }

// export const getToken = () => {
//   const token = Cookies.get(TOKEN_KEY)
//   if (token) return token
//   else return false
// }

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 *  判断是否为PC端
 */
export const isPC = () => {
  // 是否为PC端
  const userAgentInfo = navigator.userAgent
  const Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * 正式环境不出现console打印,警告等
 */

const isDev = /^(192\.168|localhost)/.test(window.location.host)
if (!isDev) {
  console.log = () => {}
  console.info = () => {}
  console.warn = () => {}
}
