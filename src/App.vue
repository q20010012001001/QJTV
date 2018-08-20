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

<style lang="less">
#app{
  // position:absolute;
  // top:0;
  z-index:999;
  width:100%;
  height:100%;
}
</style>
