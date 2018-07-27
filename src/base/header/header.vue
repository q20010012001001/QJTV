<template>
    <header class="flex flex-pack-justify flex-align-center">
        <img src="http://www.quanjiaotv.com/images/quanjiao/m/logo.png" alt="">
        <h1>全椒广播电视台</h1>
        <img @click="searchclick" src="http://www.quanjiaotv.com/images/quanjiao/m/search.png" alt="">
    </header>
</template>

<script>
export default {
  methods: {
    searchclick () {
      this.$emit('serachclick')
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
