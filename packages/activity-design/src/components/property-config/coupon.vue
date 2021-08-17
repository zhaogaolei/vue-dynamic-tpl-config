<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item label="领取前显示封面">
        <a slot="extra" target="_blank" :href="seletedItem.defaultImgUrl" v-if="seletedItem.defaultImgUrl">查看封面>></a>
        <a-input v-model="seletedItem.defaultImgUrl" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="领取后显示封面">
        <a slot="extra" target="_blank" :href="seletedItem.gettedImgUrl" v-if="seletedItem.gettedImgUrl">查看封面>></a>
        <a-input v-model="seletedItem.gettedImgUrl" placeholder="请输入" />
      </a-form-model-item>

      <a-form-model-item label="红包ID列表">
        <a-input v-model="seletedItem.cashCouponIds" placeholder="请输入，多个ID逗号分隔" />
      </a-form-model-item>

      <a-form-model-item label="红包领取链接">
        <template #extra>
          <div><a target="_blank" :href="seletedItem.getCashCouponUrl" v-if="seletedItem.getCashCouponUrl">预览当前红包>></a></div>
          <div><a target="_blank" :href="redEnvelopesManageUrl">前往红包管理后台>></a></div>
        </template>
        <a-input v-model="seletedItem.getCashCouponUrl" placeholder="请输入" />
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import { DIC } from '../../config/dic-config'
export default {
  name: 'CouponEditor',
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      redEnvelopesManageUrl: DIC.redEnvelopesManageUrl
    }
  }
}
</script>
<style lang="less" scoped>

</style>
