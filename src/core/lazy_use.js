import Vue from 'vue'
import {
  Button, Icon, Upload, Modal, message, Layout, Card, Tag,
  FormModel,
  Input, Radio, Switch
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Layout)
Vue.use(Card)
Vue.use(Tag)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Switch)

Vue.prototype.$message = message
// 全局配置message
message.config({ maxCount: 1 })
