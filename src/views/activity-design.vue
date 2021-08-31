<template>
  <z-activity-design :show-footer="showFooter" :list="list" background-color="#71c9e6" />
</template>

<script>
export default {
  data () {
    return {
      showFooter: true,
      list: [
        {
          key: 1,
          type: 'ad',
          source: 0, // 手动
          adTypeId: 0,
          adList: [
            {
              imgUrl: 'http://p1.zmjiudian.com/119IRBm2_jupiter',
              actionUrl: 'http://www.baidu.com'
            },
            {
              imgUrl: 'http://p1.zmjiudian.com/119IRBm2_jupiter',
              actionUrl: ''
            }
          ],
          swiperType: 0,
          auto: false,
          loop: false,
          isFull: true,
          label: '广告'
        },
        {
          key: 2,
          type: 'picture',
          imgUrl: 'http://p1.zmjiudian.com/121TPdk0_jupiter',
          actionUrl: '',
          isFull: true,
          label: '图片'
        },
        {
          key: 3,
          type: 'customer',
          label: '微信客服',
          backgroundUrl: 'http://p1.zmjiudian.com/120SQr60_jupiter',
          description: '',
          qrcodeUrl: ''
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.demo-activity{
  height:100%;
}
</style>
