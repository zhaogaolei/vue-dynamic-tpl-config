export const DraggableMixin = {
  computed: {
    dragOptions () {
      return {
        delayOnTouchOnly: true, // 开启触摸延时
        delay: 500, // 延时时长
        touchStartThreshold: 3, // px 防止某些手机过于敏感
        animation: 200
      }
    }
  }
}
