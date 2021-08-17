/**
 * textarea 自适应高度
 * @param {*} textarea
 */
export function makeExpandingArea (el) {
  let timer = null
  const setStyle = function (el, auto) {
    if (auto) el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
  const delayedResize = function (el) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      setStyle(el)
    }, 200)
  }
  if (el.addEventListener) {
    el.addEventListener('input', function () {
      setStyle(el, 1)
    }, false)
    setStyle(el)
  } else if (el.attachEvent) {
    el.attachEvent('onpropertychange', function () {
      setStyle(el)
    })
    setStyle(el)
  }
  if (window.VBArray && window.addEventListener) { // IE9
    el.attachEvent('onkeydown', function () {
      const key = window.event.keyCode
      if (key === 8 || key === 46) delayedResize(el)
    })
    el.attachEvent('oncut', function () {
      delayedResize(el)
    }) // 处理粘贴
  }
}
