import { version } from '../package.json'
import { createName } from './utils/format/string'
import HotelDesign from './hotel-design'
import ActivityDesign from './activity-design'

import './styles/fonts/iconfont.css'

const components = [HotelDesign, ActivityDesign]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(createName(component.name), component))
}

// 判断是否是浏览器直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  HotelDesign, ActivityDesign
}

export default {
  install, version
}
