<template>
  <div :class="['z-module-ad', { 'z-module-ad--is-full': record.isFull }]">
    <img src="http://p1.zmjiudian.com/121cKZp0_jupiter">
  </div>
</template>
<script>
export default {
  name: 'Ad',
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    record: {
      handler: function (newValue, oldValue) {
        console.log('=========>ad record', newValue)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.z-module-ad {
  // min-height: 165px;
  // background-color: #ebf8fd;
  color: #88c4dc;
  padding: 0 18px;
  > img {
    width: 100%;
    transform: translateZ(10px);
  }

  &--is-full {
    padding: 0;
  }
}
</style>
