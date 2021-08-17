import HotelDesign from './src/index.vue'
import { createName } from '../utils/format/string'

// 为组件提供 install 安装方法，供按需引入
HotelDesign.install = function (Vue) {
  Vue.component(createName(HotelDesign.name), HotelDesign)
}

export default HotelDesign
