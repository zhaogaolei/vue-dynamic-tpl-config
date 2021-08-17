<template>
  <div
    :class="[
      'z-module-picture',
      { 'z-module-picture--is-full': record.isFull },
    ]"
  >
    <div class="z-module-picture--none" v-show="!showImg">
      『点击编辑图片信息』
    </div>
    <img
      v-show="showImg"
      :src="record.imgUrl"
      alt="图片地址错误"
      @load="showImg = true"
      @error="showImg = false"
    >
  </div>
</template>
<script>
export default {
  name: 'Picture',
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
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.z-module-picture {
  color: #88c4dc;
  padding: 0 18px;

  &--none {
    background:linear-gradient(17deg,transparent 50%, #ddd 50%, #ddd 50.5%, transparent 50.5%),linear-gradient(163deg,transparent 50%, #ddd 50%, #ddd 50.5%, transparent 50.5%);
    text-align: center;
    padding: 48px 0;
    background-color: #f8f8f8;
    font-size: 16px;
  }

  > img {
    width: 100%;
    transform: translateZ(10px);
  }

  &--is-full {
    padding: 0;
  }
}
</style>
