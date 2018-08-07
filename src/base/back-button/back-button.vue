<template>
    <span class="history" @click="dlsbakc"><img :class="`historyimg${imgnumber}`" src="./video.png" alt=""></span>
</template>

<script>
export default {
  props: {
    imgnumber: {
      default: 0,
      type: Number
    }
  },
  methods: {
    dlsbakc () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.historyimg0{
    width:22/@rem;
    display:inline-block;
    position:absolute;
    top:0;
    bottom:0;
    left:30/@rem;
    margin:auto;
}
.historyimg1{
    width:22/@rem;
    display:inline-block;
    margin-left:30/@rem;
    // position:absolute;
    // top:0;
    // bottom:0;
    // left:30/@rem;
    // margin:auto;
}
</style>
