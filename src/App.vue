<template>
  <div id="app">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'

}
</script>

<style lang="less" scoped>
#app{
  // position:absolute;
  // top:0;
  z-index:999;
  width:100%;
}
</style>
