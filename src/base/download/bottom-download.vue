<template>
    <div class="bottom" ref="bottom">

        <div class="zx flex flex-pack-justify">

        <!-- 左边 -->
        <div class="left flex flex-align-center">
            <img src="@/common/image/logo.png" alt="">
            <div class="pro flex flex-v">
                <span class="d">全椒广播电视台</span>
                <span class="x">更多精彩,尽在全椒</span>
            </div>
        </div>

        <!-- 右边 -->
        <div class="flex flex-align-center">
            <div @click="downloadclick" class="bora flex flex-align-center flex-pack-center">立即打开</div>
            <div
             @click="remove(this)"
              class="remove flex flex-align-center"
               ref="remove">
                <img src="@/common/image/chaohao.png" alt="">
            </div>
        </div>

        </div>
    </div>
</template>

<script>
import {download} from '@/api/downLoad.js'
export default {
  methods: {
    remove (that) {
      this.$refs.bottom.style.display = 'none'
    },
    downloadclick () {
      download()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.zx{
    height:100%;
}
.pro{
    color:#fff;
}
.left{
    margin-left:24/@rem;
    img{
        width:42/@rem;
        margin-right:10/@rem;
    }
}
.d{
    font-size:24/@rem;

}
.x{
    font-size:16/@rem;

}
.bottom{
    height:80/@rem;
    position:fixed;
    bottom:0;
    background:rgba(0,0,0,.8);
    left:0;
    right:0;
    width:100%;
    padding:0 10/@rem;
    box-sizing: border-box;
}
.bora{
    width:140/@rem;
    height:50/@rem;
    border-radius:10/@rem;
    font-size:28/@rem;
    color:#fff;
    text-align: center;
    margin-right:40/@rem;
    line-height:50/@rem;
    background: #ff424b;
}
.remove{
    img{
    width:42/@rem;
    margin-right:8/@rem;

    }
}
</style>
