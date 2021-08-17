<template>
  <div :class="['z-module-productgroup']" :style="{backgroundColor:backgroundColor}">
    <div class="z-module-productgroup--none" v-if="!record.groupList.length">
      <span>『点击编辑商品分组』</span>
    </div>
    <div class="z-module-productgroup-name">
      <img
        v-if="record.groupList.length"
        src="http://p1.zmjiudian.com/121ZQuJ2_jupiter"
      >
    </div>

    <!-- 暂时显示top one -->
    <img
      v-if="record.groupList.length"
      :src="listStyleThumbnail[record.groupList[0].listStyle]"
      alt="Thumbnail加载失败"
    >
    <!--
    <img
      v-for="(item, index) in record.groupList"
      :key="index"
      :src="listStyleThumbnail[item.listStyle]"
      alt="Thumbnail加载失败"
    > -->
  </div>
</template>
<script>

import { DIC } from '../../config/dic-config'

export default {
  name: 'ProductGroup',
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
.z-module-productgroup {
  min-height: 165px;
  color: #88c4dc;
  padding: 0;

  &-name {
    height: 55px;
    line-height: 55px;
    > img {
      width: 100%;
      transform: translateZ(10px);
    }
  }

  &--none {
    background:linear-gradient(23deg,transparent 50%, #ddd 50%, #ddd 50.5%, transparent 50.5%),linear-gradient(157deg,transparent 50%, #ddd 50%, #ddd 50.5%, transparent 50.5%);
    position: absolute;
    left: 0;
    top:0;
    right:0;
    bottom:0;
    background-color: #f8f8f8;
    font-size: 16px;
    text-align: center;
    line-height: 165px;
  }

  > img {
      width: 100%;
      transform: translateZ(10px);
    }
}
</style>
