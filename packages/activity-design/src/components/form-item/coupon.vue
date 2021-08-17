<template>
  <div :class="['z-module-coupon']">
    <div class="z-module-coupon--none" v-show="!showImg">
      『点击编辑红包信息』
    </div>

    <img
      v-show="showImg"
      :src="record.defaultImgUrl"
      alt="图片地址错误"
      @load="showImg = true"
      @error="showImg = false"
    >
  </div>
</template>
<script>
export default {
  name: 'Coupon',
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showImg: false
    }
  }
}
</script>
<style lang="less" scoped>
.z-module-coupon {
  min-height: 72px;
  color: #88c4dc;
  padding: 12px 18px;

  &--none {
    position: absolute;
    background:linear-gradient(10deg,transparent 49.5%, #ddd 49.5%, #ddd 50.5%, transparent 50.5%),linear-gradient(170deg,transparent 49.5%, #ddd 49.5%, #ddd 50.5%, transparent 50.5%);
    left: 0;
    top:0;
    right:0;
    bottom:0;
    background-color: #f8f8f8;
    text-align: center;
    font-size: 16px;
    line-height: 72px;
  }

  > img {
    width: 100%;
    transform: translateZ(10px);
  }
}
</style>
