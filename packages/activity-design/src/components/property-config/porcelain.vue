<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" class="z-form">
      <a-form-model-item label="布局方案">
        <a-radio-group v-model="seletedItem.layout" disabled>
          <a-radio v-for="(item,index) in porcelainLayoutList" :key="index" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-card
        :title="'瓷片'+(index+1)"
        hoverable
        type="inner"
        size="small"
        class="z-ant-card"
        :body-style="{padding:'12px 12px 0 0'}"
        v-for="(item,index) in seletedItem.porcelainList"
        :key="index"
      >
        <a slot="extra" href="#" @click="onDeleteAd($event,item,index)" v-if="seletedItem.porcelainList.length>1">删除</a>
        <a-form-model-item label="图片地址">
          <a slot="extra" target="_blank" :href="item.imgUrl" v-if="item.imgUrl">预览图片>></a>
          <a-input v-model="item.imgUrl" placeholder="请输入图片地址" />
        </a-form-model-item>
        <a-form-model-item label="跳转地址">
          <a slot="extra" target="_blank" :href="item.actionUrl" v-if="item.actionUrl">查看地址>></a>
          <a-input v-model="item.actionUrl" placeholder="请输入跳转地址" />
        </a-form-model-item>
      </a-card>
      <a-form-model-item :wrapper-col="{ offset: 5 }" v-if="showAdd">
        <a-button type="link" icon="plus" @click="onAddAd">
          添加
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { DIC } from '../../config/dic-config'

export default {
  name: 'PorcelainEditor',
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      porcelainLayoutList: DIC.porcelainLayout
    }
  },

  computed: {
    showAdd () {
      const { layout, porcelainList } = this.seletedItem
      if (layout === 0) {
        return porcelainList.length < 2
      } else if (layout === 1) {
        return porcelainList.length < 3
      }
      return true
    }
  },

  methods: {
    onAddAd () {
      const itemObj = {}
      Object.keys(this.seletedItem.porcelainList[0]).map(key => { itemObj[key] = '' })
      this.seletedItem.porcelainList.push(itemObj)
    },
    onDeleteAd (event, item, index) {
      event.preventDefault() // 阻止浏览器默认事件 - 否则会触发window.onpopstate
      console.log('delete=====', event, item, index)
      this.seletedItem.porcelainList = this.seletedItem.porcelainList.filter((f, i) => i !== index)
    }
  }
}
</script>

<style lang="less" scoped>
  .z-ant-card{
    margin-bottom:12px;
  }
</style>
