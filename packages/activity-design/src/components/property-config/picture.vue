<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-model-item label="图片地址">
        <a slot="extra" target="_blank" :href="seletedItem.imgUrl" v-if="seletedItem.imgUrl">预览图片>></a>
        <a-input v-model="seletedItem.imgUrl" placeholder="请输入图片地址" />
      </a-form-model-item>
      <a-form-model-item label="跳转地址">
        <a slot="extra" target="_blank" :href="seletedItem.actionUrl" v-if="seletedItem.actionUrl">查看地址>></a>
        <a-input v-model="seletedItem.actionUrl" placeholder="请输入跳转地址" />
      </a-form-model-item>
      <a-form-model-item label="是否通栏显示">
        <a-switch v-model="seletedItem.isFull" />
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
export default {
  name: 'PictureEditor',
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="less" scoped>

</style>
