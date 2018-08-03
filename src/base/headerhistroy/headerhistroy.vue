<template>
        <div class="header">
            <span class="history" @click="dlsbakc"><img src="./video.png" alt=""></span>
            <span class="documenttil">{{headertext}}</span>
        </div>
</template>

<script>
export default {
  props: ['headertext'],
  methods: {
    dlsbakc () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.documenttil{
    display: block;
    text-align: center;
    line-height: 80/@rem;
    font-size:30/@rem;
    color:#fff;
}
.history img{
    width:22/@rem;
    display:inline-block;
    position:absolute;
    top:0;
    bottom:0;
    left:30/@rem;
    margin:auto;
}
.header{
    position:relative;
    height:80/@rem;
    background: #f00;
    padding:0 40/@rem;
}
</style>
