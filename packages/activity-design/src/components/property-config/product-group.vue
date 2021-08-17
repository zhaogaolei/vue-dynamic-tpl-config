<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <!-- 分组列表区域 -->
    <a-card size="small" title="分组列表(支持拖动排序)" :bordered="false" v-if="seletedItem.groupList.length">
      <draggable
        class="z-product-group"
        v-model="seletedItem.groupList"
        :options="dragOptions"
        ghost-class="ghost"
      >
        <a-tag
          :color="item.key===currentItem.key?'#1890ff':''"
          v-for="(item,index) in seletedItem.groupList"
          :key="index"
          @click="itemClick(item,index)"
          @close="onDeleteProduct($event,item,index)"
          closable
        >
          {{ item.name || '[请完善名称]' }}
        </a-tag>
      </draggable>
    </a-card>

    <!-- 添加分组按钮 -->
    <a-button type="link" size="small" icon="plus" @click="onAddProduct">
      添加分组
    </a-button>

    <!-- 展示区域 -->
    <a-card size="small" title="商品信息" :bordered="false" v-if="Object.keys(currentItem).length">
      <a-form-model :model="currentItem" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-model-item label="分组名称">
          <a-input ref="nameRef" v-model="currentItem.name" placeholder="请输入,最多8个字符" :max-length="8" />
        </a-form-model-item>
        <ProductEditor class="z-card-small" :seleted-item="currentItem" />
      </a-form-model>
    </a-card>
  </a-card>
</template>
<script>
import { basicsList } from '../../config/data-config'
import { ProductEditor } from '../property-config'
import { DraggableMixin } from '../../../../mixins/draggable'
import draggable from 'vuedraggable'
export default {
  name: 'ProductGroupEditor',
  components: {
    ProductEditor, draggable
  },
  mixins: [DraggableMixin],
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      basicsList: basicsList,
      currentItem: {}
    }
  },
  methods: {
    // 初始化
    initData () {
      this.currentItem = {}
    },
    autoFocus () {
      this.$nextTick(() => {
        this.$refs.nameRef.focus()
      })
    },

    // 添加新商品
    onAddProduct () {
      let productItem = basicsList.find(f => f.type === 'product')
      productItem = JSON.stringify(productItem)
      productItem = JSON.parse(productItem)
      delete productItem.label
      delete productItem.type // 删除多余字段
      const getMaxKey = Math.max(...this.seletedItem.groupList.map(m => m.key)) // 生成主键key
      productItem.key = isNaN(getMaxKey) || getMaxKey === -Infinity ? 0 : getMaxKey + 1
      this.seletedItem.groupList.push(productItem)
      this.itemClick(productItem)
      this.autoFocus()
    },

    itemClick (item, index) {
      this.currentItem = item
      this.autoFocus()
    },

    onDeleteProduct (e, item, index) {
      e.preventDefault()
      this.seletedItem.groupList = this.seletedItem.groupList.filter((f, i) => i !== index)
      // 如删除当前选中项，清空当前选择
      item.key === this.currentItem.key && (this.currentItem = {})
    }
  }
}
</script>
<style lang="less" scoped>
  .z-product-group{
    >.ant-tag{
      margin-bottom:8px;
    }
  }
  .z-card-small{
    /deep/ .ant-card-body{
      padding:0;
    }
  }
  .ghost {
    opacity: 0.5;
    background: #f7f8fa;
  }
</style>
