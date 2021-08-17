<template>
  <div class="demo-hotel">
    <z-hotel-design @save="testSave" :list="list" :title="title" />
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'DemoHotel',
  data () {
    return {
      title: '凤凰如家',
      list: [{
        key: 3,
        label: '图片',
        type: 'picture',
        list: ['121bLA60',
          '121LQjl0',
          '121bLA60',
          '121LQjl0', '121bLA60',
          '121LQjl0', '121bLA60',
          '121LQjl0', '121bLA60'],
        options: {
          placeholder: ''
        }
      }]
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    testSave (list) {
      console.log('保存json', list)
    }
  }
}
</script>
<style lang="less" scoped>
.demo-hotel {
  width: 100%;
  height: 100%;
}
</style>
