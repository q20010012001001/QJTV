<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style lang="less" scoped>
@import '~common/less/common.less';
.loading{
  padding-top:20/@rem;
  text-align: center;
  img{
    display:inline-block;
    margin:0 auto;
    width:0.7rem;
  }
  p{
    text-align: center;
  }
}
</style>
