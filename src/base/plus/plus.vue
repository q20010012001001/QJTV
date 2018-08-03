<template>
    <section class="plus">
        <div class="true">
            <div class="title">我的频道<span>点击删除频道</span></div>
            <ul class="clearfix">
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
            </ul>
        </div>
        <div class="flase">
            <div class="title">频道推荐<span>点击添加以下频道</span></div>
            <ul>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
                <li class="omit border-box">全全椒新闻椒新闻</li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      plus: state => state.plus.HEADERFOOTER
    })
  },
  mounted () {
    // console.log(this.plus)
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.true{
    margin-top:80/@rem;
}
ul{
            flex-wrap: wrap;
    }
    ul li{
        margin-right:20/@rem;
        &:nth-of-type(4n+0){
            margin-right:0
        }
        width:156/@rem;
        float: left;
        background: #fff;
        color:#000;
        font-size:30/@rem;
        margin-bottom:20/@rem;
        padding:14/@rem 20/@rem;
    }
.true,.false{
    margin-bottom:40/@rem;

}
    .plus{
        width:100%;
        height:100%;
        background:#f4f5f6;
        padding:0 30/@rem;
        box-sizing: border-box;
        position:fixed;
        top:0;
    }
    .title{
        font-size:33/@rem;
        margin-bottom:40/@rem;

        color:#000;
        font-weight:bold;
        span{
            color:#a0a0a0;
            font-size:24/@rem;
            font-weight:normal;
            margin-left:22/@rem;
        }
    }
</style>
