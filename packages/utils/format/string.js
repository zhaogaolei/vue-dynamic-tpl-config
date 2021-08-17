const componentPrefix = 'z'
const linethroughRE = /[A-Z]/g
/**
 * 将pascal或者camel命名，格式化成中划线 ‘-’
 * @param {*} str
 */
export function linethrough (str) {
  return str.replace(linethroughRE, _ => '-' + _.toLowerCase())
}
/**
 * 格式化组件名称：zmjd-xxx-xxx
 * @param {*} name 组件名称
 */
export function createName (name) {
  return componentPrefix + linethrough(name)
}
