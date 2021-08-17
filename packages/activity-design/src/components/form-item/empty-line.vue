<template>
  <div :class="['z-module-emptyline']" />
</template>
<script>
export default {
  name: 'EmptyLine',
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    record: {
      handler: function (newValue, oldValue) {
      },
      deep: true
    }
  },
  computed: {
    getStyle () {
      const style = {}
      return style
    }
  }
}
</script>
<style lang="less" scoped>
.z-module-emptyline {
  min-height: 18px;
  // background-color: #ebf8fd;
}
</style>
