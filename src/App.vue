<template>
  <div id="app">
    <div class="header">
          <!-- 头 -->
          <hheader></hheader>

          <!-- 导航 -->
          <hnav></hnav>

          <!-- 内容 -->
          <keep-alive include="list">
            <router-view></router-view>
          </keep-alive>
    </div>
  </div>
</template>

<script>
import hheader from '@/components/header/header'
import hnav from '@/components/nav/nav'
export default {
  name: 'App',
  components: {
    hheader,
    hnav
  }
}
</script>

<style lang="less" scoped>
.header{
  // position:absolute;
  // top:0;
  z-index:999;
  width:100%;
}
</style>
