
/**
 * 多个js文件让其异步执行并按顺序加载
 * 通过监听 onload 事件来判断文件是否加载完成，
 * 配合 Promise 等待上一个脚本文件加载完成后再加载下一个文件，从而实现按次序加载执行脚本
 */

const loadJs = url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.defer = true
    script.onload = function() {
      resolve()
    }
    document.body.appendChild(script)
  })
}

// 按顺序加载js
const loadFile = async(listUrl) => {
  for (const url of listUrl) {
    await loadJs(url)
  }
}

export default loadFile

