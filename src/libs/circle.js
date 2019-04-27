
// 获取一个范围内的随机数random返回一个大于0小于1的一个随机数
function selectFrom(Lowervalue, upperValue) {
  var choices = upperValue - Lowervalue + 1
  return Math.floor(Math.random() * choices + Lowervalue)
}
function Circle() {
  this.div = document.createElement('div')
  this.r = selectFrom(10, 40)
  this.left = selectFrom(0, 100)
  this.top = selectFrom(0, 50)
  this.bg = 'rgba(' + selectFrom(0, 255) + ',' + selectFrom(0, 255) + ',' + selectFrom(0, 255) + ',' + Math.random() + ')'
  this.speedX = selectFrom(-10, 10)
  this.speedY = selectFrom(-8, 8)
}
// 绘制小球
Circle.prototype.drawCirle = function(parent) {
  // 将parent设置成该div的一个属性
  this.parent = parent
  var style = this.div.style
  style.width = this.r * 2 + 'px'
  style.height = this.r * 2 + 'px'
  style.left = this.left + 'px'
  style.top = this.top + 'px'
  style.backgroundColor = this.bg
  parent.appendChild(this.div)
}
// 设置运行速度
Circle.prototype.run = function() {
  var maxLeft = 1435 - this.r * 2
  var maxTop = 700 - this.r * 2
  var that = this
  // 使用间隔式计时器
  setInterval(function() {
    var left = that.div.offsetLeft + that.speedX
    var top = that.div.offsetTop + that.speedY
    if (left <= 0) {
      left = 0
      that.speedX *= -1
    }
    if (top <= 0) {
      top = 0
      that.speedY *= -1
    }
    if (left >= maxLeft) {
      left = maxLeft
      that.speedX *= -1
    }
    if (top >= maxTop) {
      top = maxTop
      that.speedY *= -1
    }
    that.div.style.left = left + 'px'
    that.div.style.top = top + 'px'
  }, 30)
}

export default Circle
