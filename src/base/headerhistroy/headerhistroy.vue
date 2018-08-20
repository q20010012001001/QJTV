<template>
        <div class="header">
            <backbutton :imgnumber="0"></backbutton>
            <span class="documenttil">{{headertext}}</span>
        </div>
</template>

<script>
import backbutton from '@/base/back-button/back-button.vue'
export default {
  props: ['headertext'],
  components: {
    backbutton
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
.header{
    position:fixed;
    height:80/@rem;
    top:0;
  left:0;
  width:100%;
    background: #f00;
    padding:0 40/@rem;
  z-index:999;
      box-sizing: border-box;

    img{
    //         width:22/@rem;
    // display:inline-block;
    // position:absolute;
    // top:0;
    // bottom:0;
    // left:30/@rem;
    // margin:auto;
    }
}

</style>
