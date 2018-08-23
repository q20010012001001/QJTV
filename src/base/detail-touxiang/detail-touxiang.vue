<template>
    <img :src="img" alt="">
</template>

<script>
let imgdefault = require('@/common/image/logo.png')
export default {
  props: {
    img: {
      type: String,
      default: imgdefault
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
img{
margin-right:20/@rem;
        width:52/@rem;
        height:52/@rem;
        display:inline-block;
        border-radius:50%;
}
</style>
