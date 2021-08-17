<template>
  <div class="z-page">
    <Layout :show-footer="showFooter">
      <template #content>
        <div class="z-show-wrap" :style="{backgroundColor:backgroundColor}">
          <img src="http://p1.zmjiudian.com/121fL4M0_jupiter">
          <div class="z-show-wrap-content">
            <!-- 添加新模块 -->
            <div class="z-show-wrap-content-addbtn" @click="onAddModules" v-if="data.length===0">
              <a-icon theme="filled" type="plus-circle" />新模块
            </div>

            <!-- 可视区域 -->
            <div
              v-for="(item,index) in data"
              :key="index"
              :class="['z-module',{ 'z-module-hover': item.key == mouseOverItem.key,'z-module-selected': item.key == seletedItem.key}]"
              @mouseenter="mouseEnter(item,index)"
              @mouseleave="mouseLeave"
              @click="itemClick(item,index)"
            >
              <span class="z-show-wrap-add z-show-wrap-add-top" v-show="item.key === mouseOverItem.key" @click="topAdd($event,item,index)">
                <a-icon theme="filled" type="plus-circle" />
              </span>

              <Ad v-if="item.type==='ad'" :record="item" />
              <Picture v-if="item.type==='picture'" :record="item" />
              <Coupon v-if="item.type==='coupon'" :record="item" />
              <Product v-if="item.type==='product'" :record="item" :background-color="backgroundColor" />
              <ProductGroup v-if="item.type==='productGroup'" :record="item" :background-color="backgroundColor" />
              <EmptyLine v-if="item.type==='emptyLine'" :record="item" />
              <Customer v-if="item.type==='customer'" :record="item" />

              <span class="z-show-wrap-add z-show-wrap-add-bottom" v-show="item.key === mouseOverItem.key" @click="bottomAdd($event,item,index)">
                <a-icon theme="filled" type="plus-circle" />
              </span>

              <div class="z-show-wrap-operate" v-show="item.key === mouseOverItem.key">
                <a-icon type="delete" @click="onDelete($event,item,index)" />
                <a-icon type="arrow-up" @click="onMoveUp($event,item,index)" v-if="index!==0" />
                <a-icon type="arrow-down" @click="onMoveDown($event,item,index)" v-if="index!==data.length-1" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #editor>
        <div class="z-editor-wrap" v-if="Object.keys(seletedItem).length">
          <AdEditor v-if="seletedItem.type==='ad'" :seleted-item="seletedItem" />
          <CouponEditor v-if="seletedItem.type==='coupon'" :seleted-item="seletedItem" />
          <PictureEditor v-if="seletedItem.type==='picture'" :seleted-item="seletedItem" />
          <ProductEditor v-if="seletedItem.type==='product'" :seleted-item="seletedItem" />
          <ProductGroupEditor ref="productGroupEditorRef" v-if="seletedItem.type==='productGroup'" :seleted-item="seletedItem" />
          <CustomerEditor v-if="seletedItem.type==='customer'" :seleted-item="seletedItem" />
        </div>
      </template>

      <template #footer>
        <div class="z-footer-wrap">
          <a-button type="primary" @click="onSave">
            保存
          </a-button>
        </div>
      </template>
    </Layout>

    <!-- 弹窗添加模块区域 -->
    <a-modal v-model="modalVisible" title="添加模块" :footer="null">
      <div class="z-modal-buttons">
        <a-button v-for="(record,index) in basicsList" :key="index" @click="modulesAdd(record)">
          {{ record.label }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import Layout from '../../layout'
import { basicsList } from './config/data-config'
import { Ad, Coupon, Picture, Product, ProductGroup, EmptyLine, Customer } from './components/form-item'
import { AdEditor, CouponEditor, PictureEditor, ProductEditor, ProductGroupEditor, CustomerEditor } from './components/property-config'
export default {
  name: 'ActivityDesign',
  components: {
    Layout,
    Ad,
    Coupon,
    Picture,
    Product,
    ProductGroup,
    EmptyLine,
    Customer,
    AdEditor,
    CouponEditor,
    PictureEditor,
    ProductEditor,
    ProductGroupEditor,
    CustomerEditor
  },
  props: {
    list: {
      type: Array,
      default: () => []// JSON.parse(JSON.stringify(basicsList))
    },
    title: String,
    showFooter: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {
      basicsList: basicsList,
      data: [],
      mouseOverItem: {},
      seletedItem: {},
      // 弹框
      modalVisible: false,
      // 插入方式
      insertType: '', // top | buttom
      // 插入索引
      insertIndex: '',
      currentSelectKey: ''
    }
  },
  watch: {
    list: {
      handler (newValue, oldValue) {
        this.data = cloneDeep(newValue)
      },
      deep: true
    }
  },
  mounted () {
    this.data = cloneDeep(this.list) // JSON.parse(JSON.stringify(this.list))
  },
  methods: {
    // initModel (list) {
    //   this.data = [...list]
    // },
    getModel () {
      return this.data
    },
    // 添加新模块
    onAddModules () {
      this.toggleModal()
      this.insertType = ''
    },
    mouseEnter (item, index) {
      this.mouseOverItem = item
    },
    mouseLeave () {
      this.mouseOverItem = {}
    },
    itemClick (item, index) {
      // 重复点击同一个item,直接return
      if (this.currentSelectKey === item.key) return
      this.seletedItem = item
      this.currentSelectKey = item.key
      // 切换到 商品分组时，初始化ProductGroupEditor组件
      if (item.type === 'productGroup') {
        this.$nextTick(() => {
          this.$refs.productGroupEditorRef.initData()
        })
      }
    },

    topAdd (e, item, index) {
      e.stopPropagation()
      this.insertType = 'top'
      this.insertIndex = index
      this.toggleModal()
    },

    bottomAdd (e, item, index) {
      e.stopPropagation()
      this.insertType = 'bottom'
      this.insertIndex = index
      this.toggleModal()
    },

    // modal button click
    modulesAdd (item) {
      const getMaxKey = Math.max(...this.data.map(m => m.key))
      const itemString = JSON.stringify(item)
      const record = JSON.parse(itemString)
      record.key = isNaN(getMaxKey) || getMaxKey === -Infinity ? 0 : getMaxKey + 1
      if (this.insertType === '') {
        this.data.push(record)
      } else if (this.insertType === 'top') {
        this.data.splice(this.insertIndex, 0, record)
      } else if (this.insertType === 'bottom') {
        this.data.splice(this.insertIndex + 1, 0, record)
      }
      this.toggleModal()
    },

    // modal visible
    toggleModal () {
      this.modalVisible = !this.modalVisible
    },

    onDelete (e, item, index) {
      e.stopPropagation()
      this.data = this.data.filter((f, i) => i !== index)
      // 清空右侧编辑对象
      this.seletedItem = {}
    },

    onMoveUp (e, item, index) {
      e.stopPropagation()
      if (index !== 0) {
        this.data[index] = this.data.splice(index - 1, 1, this.data[index])[0]
      } else {
        this.data.push(this.data.shift())
      }
    },
    onMoveDown (e, item, index) {
      e.stopPropagation()
      if (index !== this.data.length - 1) {
        this.data[index] = this.data.splice(index + 1, 1, this.data[index])[0]
      } else {
        this.data.unshift(this.data.pop())
      }
    },

    onSave () {
      console.log('return data =>>>>', this.data)
      this.$emit('save', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
