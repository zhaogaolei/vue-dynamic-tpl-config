<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" class="z-form">
      <a-form-model-item label="广告来源">
        <a-radio-group v-model="seletedItem.source">
          <a-radio v-for="(item,index) in sourceList" :key="index" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-card
        hoverable
        type="inner"
        size="small"
        class="z-ant-card"
        :body-style="{padding:'12px 12px 0 0'}"
        v-show="seletedItem.source===0"
        v-for="(item,index) in seletedItem.adList"
        :key="index"
      >
        <a slot="extra" href="#" @click="onDeleteAd($event,item,index)" v-if="seletedItem.adList.length>1">删除</a>
        <a-form-model-item label="图片地址">
          <a slot="extra" target="_blank" :href="item.imgUrl" v-if="item.imgUrl">预览图片>></a>
          <a-input v-model="item.imgUrl" placeholder="请输入图片地址" />
        </a-form-model-item>
        <a-form-model-item label="跳转地址">
          <a slot="extra" target="_blank" :href="item.actionUrl" v-if="item.actionUrl">查看地址>></a>
          <a-input v-model="item.actionUrl" placeholder="请输入跳转地址" />
        </a-form-model-item>
      </a-card>
      <a-form-model-item :wrapper-col="{ offset: 5 }" v-show="seletedItem.source===0">
        <a-button type="link" icon="plus" @click="onAddAd">
          添加
        </a-button>
      </a-form-model-item>
      <a-form-model-item label="广告类型ID" v-show="seletedItem.source===1">
        <a slot="extra" target="_blank" :href="`${adManageUrl}${seletedItem.adTypeId}`" v-if="seletedItem.adTypeId">前往广告后台>></a>
        <a-input v-model="seletedItem.adTypeId" />
      </a-form-model-item>
      <a-form-model-item label="是否自动轮播">
        <a-switch v-model="seletedItem.auto" />
      </a-form-model-item>
      <a-form-model-item label="是否自动循环">
        <a-switch v-model="seletedItem.loop" />
      </a-form-model-item>
      <a-form-model-item label="是否通栏显示">
        <a-switch v-model="seletedItem.isFull" />
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { DIC } from '../../config/dic-config'

export default {
  name: 'AdEditor',
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      sourceList: DIC.adSource,
      adManageUrl: DIC.adManageUrl
    }
  },

  methods: {
    onAddAd () {
      const itemObj = {}
      Object.keys(this.seletedItem.adList[0]).map(key => { itemObj[key] = '' })
      this.seletedItem.adList.push(itemObj)
    },
    onDeleteAd (event, item, index) {
      event.preventDefault() // 阻止浏览器默认事件 - 否则会触发window.onpopstate
      console.log('delete=====', event, item, index)
      this.seletedItem.adList = this.seletedItem.adList.filter((f, i) => i !== index)
    }
  }
}
</script>

<style lang="less" scoped>
  .z-ant-card{
    margin-bottom:12px;
  }
</style>
