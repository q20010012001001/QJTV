<template>
    <header class="flex flex-pack-justify flex-align-center">
        <img @click="logoClick" src="@/common/image/logo.png" alt="">
        <h1>{{title}}</h1>
        <img @click="searchclick" src="./search.png" alt="">
    </header>
</template>

<script>

export default {
  props: {
    title: ''
  },

  methods: {
    searchclick () {
      this.$router.push({
        name: 'search'
      })
    },
    logoClick () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="less" scoped>

@import '~less/common.less';
header{
    height:80/@rem;
    background: #f00;
    padding:0 40/@rem;
    img{
        width:42/@rem;
    }
    h1{
        font-size:30/@rem;
        font-weight:normal;
        color:#fff;
    }
}
</style>
