<template>
    <div class="hidepro">
          <div class="albumlength">
                <span class="da">{{currentIndex + 1}}</span><span>/{{durationIndex}}</span>
            </div>
        </div>
</template>

<script>
export default {
  props: ['currentIndex', 'durationIndex']
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.hidepro{
  position: absolute;
      bottom: 20/@rem;
    left: 0;
    right: 0;
        color: #fff;
        width:100%;
        .albumlength{
          border-left:0;
          margin:0 auto;
        }
}
.albumlength{
    border-left:1px solid #fff;
    text-align: center;
    font-size:40/@rem;
    transform: translate3d(0,0,0);
    .da{
        font-size:56/@rem;
    }
}
.albumlength{
    width:180/@rem;
}
</style>
