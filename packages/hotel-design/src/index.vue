<template>
  <div class="z-hotel">
    <div :style="{display:'flex'}">
      <!-- 视图区域 -->
      <div class="z-hotel-mobile">
        <img src="./assets/img/task-bar.png">
        <div class="z-hotel-mobile-title">
          <img src="./assets/img/back.png">
          <div>{{ title || '' }}</div>
          <img src="./assets/img/share.png">
        </div>
        <div class="z-hotel-mobile-tabs">
          <div>房券</div>
          <div>须知</div>
          <div class="z-hotel-mobile-tabs-detail">
            详情
            <div class="z-hotel-mobile-tabs-subline" />
          </div>
        </div>
        <div class="z-hotel-mobile-content" :style="{paddingTop: data[0]&&data[0].key===mouseOverItem.key?'10px':0}">
          <div class="z-hotel-mobile-content-addbtn" v-if="data.length===0" @click="onAddModules">
            <span class="iconfont icon-add" />新模块
          </div>

          <div
            v-for="(item,index) in data"
            :key="index"
            :class="[{'z-item-input':item.type==='input'},{'z-item-picture':item.type==='picture'},
                     { 'z-item-hover': item.key == mouseOverItem.key,'z-item-selected': item.key == seletedItem.key}]"
            @mouseenter="mouseEnter(item,index)"
            @mouseleave="mouseLeave"
            @click="itemClick(item,index)"
          >
            <span class="circle-add circle-add-top" v-show="item.key === mouseOverItem.key" @click="topAdd($event,item,index)">+</span>

            <pre v-if="item.type==='input'">{{ item.value || '点击编辑『文本』' }}</pre>

            <div v-if="item.type==='picture'" class="z-picture-list">
              <template v-if="item.list.length">
                <img v-for="(pic,index) in item.list" :src="pic | formatPic" :key="index">
              </template>
              <div v-else>
                <div class="z-item-picture-none">
                  点击上传图片
                </div>
                <div>推荐宽度1024像素</div>
              </div>
            </div>

            <span class="circle-add circle-add-bottom" v-show="item.key === mouseOverItem.key" @click="bottomAdd($event,item,index)">+</span>

            <div class="operate" v-show="item.key === mouseOverItem.key">
              <a-icon type="delete" @click="onDelete($event,item,index)" />
              <a-icon type="arrow-up" @click="onMoveUp($event,item,index)" v-if="index!==0" />
              <a-icon type="arrow-down" @click="onMoveDown($event,item,index)" v-if="index!==data.length-1" />
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧编辑区域 -->
      <div class="z-editor-wrap" v-show="Object.keys(seletedItem).length">
        <div v-if="seletedItem.type==='input'">
          <div class="edit-title">
            {{ seletedItem.label }}
          </div>
          <div class="edit-group">
            <div class="edit-group-label">
              文本内容
            </div>
            <div class="edit-group-value">
              <textarea ref="textareaRef" rows="3" :placeholder="seletedItem.options.placeholder" v-model="seletedItem.value" contenteditable="true" />
            </div>
          </div>
        </div>

        <div v-else-if="seletedItem.type==='picture'">
          <div class="edit-title">
            图片
          </div>
          <div class="edit-group">
            <div class="edit-group-label">
              上传图片
            </div>
            <div class="edit-group-desc">
              最多上传10张图片，推荐宽度1024像素
            </div>
            <div class="edit-group-value">
              <draggable class="picture-list" v-model="seletedItem.list" :options="dragOptions" ghost-class="ghost">
                <div class="picture-list-item" v-for="(pic,index) in seletedItem.list" :key="index">
                  <img :src="pic | formatPic">
                  <span class="delete">
                    <a-icon type="close-circle" theme="filled" @click="onDeletePic($event,pic,index)" />
                  </span>
                </div>
              </draggable>
            </div>
            <div v-if="seletedItem.list.length<11">
              <a-upload
                :multiple="true"
                list-type="picture"
                :show-upload-list="false"
                accept="image/*"
                :before-upload="beforeUpload"
                :custom-request="uploadPic"
              >
                <a-button>添加图片</a-button>
              </a-upload>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮区域 -->
    <div class="z-footer-wrap">
      <a-button type="primary" @click="onSave">
        保存
      </a-button>
    </div>

    <!-- 弹窗添加模块区域 -->
    <a-modal v-model="modalVisible" title="添加模块" :footer="null" :centered="true">
      <div class="z-modal-buttons">
        <a-button v-for="(record,index) in basicsList" :key="index" @click="modulesAdd(record)">
          {{ record.label }}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>

import cloneDeep from 'lodash/cloneDeep'
import { basicsList } from './config/data-config'
import { uploadPic } from '../../utils/upload'
import { makeExpandingArea } from '../../utils/dom'
import { DraggableMixin } from '../../mixins/draggable'
import draggable from 'vuedraggable'

export default {
  name: 'HotelDesign',
  components: { draggable },
  mixins: [DraggableMixin],
  props: {
    list: {
      type: Array,
      default: () => []// JSON.parse(JSON.stringify(basicsList))
    },
    title: String
  },
  data () {
    return {
      basicsList: basicsList,
      data: [],
      mouseOverItem: {},
      seletedItem: {},
      // 弹框
      modalVisible: false,
      // 插入方式
      insertType: '', // top | buttom
      // 插入索引
      insertIndex: ''
    }
  },
  filters: {
    formatPic: function (value) {
      return `http://p1.zmjiudian.com/${value}_jupiter`
    }
  },
  mounted () {
    this.data = cloneDeep(this.list)
  },
  watch: {
    list: {
      handler (newValue, oldValue) {
        // console.log('this.data/////////=====', newValue)
        this.data = [...newValue]
      },
      deep: true
    }
  },
  methods: {
    initModel (list) {
      this.data = [...list]
    },
    getModel () {
      return this.data
    },
    onAddModules () {
      this.toggleModal()
      this.insertType = ''
    },
    mouseEnter (item, index) {
      console.log('==========>', item)
      this.mouseOverItem = item
    },
    mouseLeave () {
      this.mouseOverItem = {}
    },
    itemClick (item, index) {
      this.seletedItem = item
      // textarea 自适应高度
      if (item.type === 'input') {
        this.$nextTick(() => {
          makeExpandingArea(this.$refs.textareaRef)
        })
      }
    },

    topAdd (e, item, index) {
      e.stopPropagation()
      this.insertType = 'top'
      this.insertIndex = index
      this.toggleModal()
    },

    bottomAdd (e, item, index) {
      e.stopPropagation()
      this.insertType = 'bottom'
      this.insertIndex = index
      this.toggleModal()
    },

    // modal button click
    modulesAdd (item) {
      const getMaxKey = Math.max(...this.data.map(m => m.key))
      const itemString = JSON.stringify(item)
      const record = JSON.parse(itemString)
      record.key = getMaxKey === -Infinity ? 0 : getMaxKey + 1
      if (this.insertType === '') {
        this.data.push(record)
      } else if (this.insertType === 'top') {
        this.data.splice(this.insertIndex, 0, record)
      } else if (this.insertType === 'bottom') {
        this.data.splice(this.insertIndex + 1, 0, record)
      }
      this.toggleModal()
    },

    // modal visible
    toggleModal () {
      this.modalVisible = !this.modalVisible
    },

    onDelete (e, item, index) {
      e.stopPropagation()
      this.data = this.data.filter((f, i) => i !== index)
      // 清空右侧编辑对象
      this.seletedItem = {}
    },

    onMoveUp (e, item, index) {
      e.stopPropagation()
      if (index !== 0) {
        this.data[index] = this.data.splice(index - 1, 1, this.data[index])[0]
      } else {
        this.data.push(this.data.shift())
      }
    },
    onMoveDown (e, item, index) {
      e.stopPropagation()
      if (index !== this.data.length - 1) {
        this.data[index] = this.data.splice(index + 1, 1, this.data[index])[0]
      } else {
        this.data.unshift(this.data.pop())
      }
    },

    // 图片你上传 start
    // 上传之前判断大小
    beforeUpload: function (file, fileList) {
      // console.log('=====>', fileList)
      // var isLt3M = file.size / 1024 / 1024 < 3
      // if (!isLt3M) {
      //   this.$message.error('图片大小必须小于 3MB!')
      // }
      // return isLt3M
      // 判断10张图片限制
      const lastCount = 10 - this.seletedItem.list.length // 可上传数量
      const canUpload = fileList.length <= lastCount
      if (!canUpload) {
        this.$message.config({ maxCount: 1 })
        this.$message.error('最多上传10张图片')
      }
      return canUpload
    },
    // 上传图片
    uploadPic: function (opts) {
      console.log('自定义上传配置list=', opts)
      uploadPic(opts.file, this.savePicsName)
      // 必须setTimeout才有效
      setTimeout(function () {
        opts.onSuccess(null, opts.file)
      })
    },
    savePicsName: function (upyFileName, originFileName) {
      this.seletedItem.list.push(upyFileName.substring(1))
    },
    // -- 图片上传 end

    // 删除图片
    onDeletePic (e, item, index) {
      this.seletedItem.list.splice(index, 1)
      e.stopPropagation()
    },

    onSave () {
      this.$emit('save', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
.ghost {
    opacity: 0.5;
    background: #f7f8fa;
  }
</style>
