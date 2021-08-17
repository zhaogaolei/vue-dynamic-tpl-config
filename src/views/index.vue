<template>
  <div id="nav">
    <div>
      <router-link to="/hoteldesign">
        酒店详情模版
      </router-link>
    </div>
    <div>
      <router-link to="/activitydesign">
        活动模版
      </router-link>
    </div>
  </div>
</template>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
