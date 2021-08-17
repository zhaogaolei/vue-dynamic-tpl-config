<template>
  <a-layout class="z-layout">
    <!-- <a-layout>
      <a-layout-content class="z-layout-content">
        <slot name="content" />
      </a-layout-content>
      <a-layout-sider class="z-layout-sider" :width="500">
        <slot name="sider" />
      </a-layout-sider>
    </a-layout>
    <a-layout-footer class="z-layout-footer">
      <slot name="footer" />
    </a-layout-footer> -->
    <div class="z-layout-body">
      <slot name="content" />
      <div class="z-layout-sider">
        <slot name="editor">
          <a-card title="编辑区域" :bordered="false" />
        </slot>
      </div>
    </div>
    <div class="z-layout-footer" v-if="showFooter">
      <slot name="footer" />
    </div>
  </a-layout>
</template>
<script>
export default {
  name: 'Layout',
  props: {
    showFooter: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
