<template>
  <div :class="['z-module-product']" :style="{backgroundColor:backgroundColor}">
    <img :src="listStyleThumbnail[record.listStyle]" alt="Thumbnail加载失败">
  </div>
</template>
<script>
import { DIC } from '../../config/dic-config'
export default {
  name: 'Product',
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    backgroundColor: String
  },
  data () {
    return {
      listStyleThumbnail: DIC.listStyleThumbnail
    }
  }
}
</script>
<style lang="less" scoped>
.z-module-product {
   padding: 12px 0 0 0;

  > img {
    width: 100%;
    transform: translateZ(10px);
  }
}
</style>
