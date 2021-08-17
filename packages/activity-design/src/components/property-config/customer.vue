<template>
  <a-card :title="seletedItem.label" :bordered="false">
    <a-form-model :model="seletedItem" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item label="模块背景图">
        <a slot="extra" target="_blank" :href="seletedItem.backgroundUrl" v-if="seletedItem.backgroundUrl">查看图片>></a>
        <a-input v-model="seletedItem.backgroundUrl" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="添加文案">
        <a-textarea v-model="seletedItem.description" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="客服二维码">
        <a slot="extra" target="_blank" :href="seletedItem.qrcodeUrl" v-if="seletedItem.qrcodeUrl">查看二维码>></a>
        <a-input v-model="seletedItem.qrcodeUrl" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="是否通栏显示">
        <a-switch v-model="seletedItem.isFull" />
      </a-form-model-item>

      <a-form-model-item label="加客服弹窗预览">
        <div class="qrcode-container">
          <div class="qrcode-container-desc">
            {{ seletedItem.description || '请添加文案' }}
          </div>
          <div class="qrcode-container-img">
            <img src="http://p1.zmjiudian.com/121GPFN0_jupiter" v-show="!showImg">
            <img
              v-show="showImg"
              :src="seletedItem.qrcodeUrl"
              alt="二维码地址错误"
              @load="showImg = true"
              @error="showImg = false"
            >
          </div>
          <div class="qrcode-container-desc-bottom">
            长按识别上面二维码
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import { DIC } from '../../config/dic-config'
export default {
  name: 'CustomerEditor',
  props: {
    seletedItem: {
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
.qrcode-container {
    background: #ffffff;
    border-radius: 8px;
    padding: 30px 0;
    text-align: center;
    box-shadow: 0px 0px 10px 5px #e3e3e3;

    &-desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      line-height: 20px;
      padding: 0 36px;
       margin-bottom:12px;
    }
    &-img{
      padding: 0 44px;
      margin-bottom:12px;
      > img {
        display: block;
        width: 100%;
        height: 252px;
      }
    }

    &-desc-bottom {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
    }
  }
</style>
