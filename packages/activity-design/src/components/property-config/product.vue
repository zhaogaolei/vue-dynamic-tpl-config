<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-model-item label="商品来源">
        <a-radio-group v-model="seletedItem.source">
          <a-radio v-for="(item,index) in sourceList" :key="index" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="商品列表" v-show="[0,1].includes(seletedItem.source)">
        <a-input v-model="seletedItem.productIds" placeholder="请输入商品id,逗号分隔" />
      </a-form-model-item>
      <a-form-model-item label="专辑ID" v-show="[2,3].includes(seletedItem.source)">
        <a slot="extra" target="_blank" :href="`${albumsManageUrl}${seletedItem.productAlbumId}`" v-if="seletedItem.productAlbumId">前往券专辑后台>></a>
        <a-input v-model="seletedItem.productAlbumId" />
      </a-form-model-item>
      <a-form-model-item label="显示个数" v-show="[2,3].includes(seletedItem.source)">
        <a-input v-model="seletedItem.showCount" />
      </a-form-model-item>
      <a-form-model-item label="列表样式">
        <a-radio-group v-model="seletedItem.listStyle">
          <a-radio v-for="(item,index) in listStyle" :key="index" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import { DIC } from '../../config/dic-config'
export default {
  name: 'ProductEditor',
  props: {
    seletedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      sourceList: DIC.productSource,
      listStyle: DIC.listStyle,
      albumsManageUrl: DIC.albumsManageUrl
    }
  }
}
</script>
<style lang="less" scoped>

</style>
