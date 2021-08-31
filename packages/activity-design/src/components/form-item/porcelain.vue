<template>
  <div :class="['z-module-porcelain', { 'z-module-porcelain--is-full': true }]">
    <img v-if="record.layout===0" src="http://p1.zmjiudian.com/121bSFI1_jupiter">
    <img v-if="record.layout===1" src="http://p1.zmjiudian.com/121bSFI0_jupiter">
  </div>
</template>
<script>
export default {
  name: 'Porcelain',
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
.z-module-porcelain {
  min-height: 165px;
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
