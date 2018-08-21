<template>
    <div class="footer">
        <div class="flex flex-pack-center flex-align-center">
            <span class="da">全椒广播电视台</span>
            <span class="xi">查看全部精彩评论</span>
            <div class="donwload flex flex-align-center flex-pack-center">
                <span>打开</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.footer{
    background: url('./footerplbannerbackgroundcover.png') no-repeat center center;
    background-size: cover;
    height:160/@rem;
    box-sizing:border-box;
    &>div{
        height:100%;
        padding-top:60/@rem;
        box-sizing: border-box;
    }
}
.da{
    font-size: 24/@rem;
    color:#fff;
    font-weight:bold;
    margin-right:20/@rem;
}
.xi{
    margin-right:20/@rem;

    font-size: 24/@rem;
    opacity: .7;
    color:#fff;
}
.donwload{
    margin-left:20/@rem;
    width:120/@rem;
    height:40/@rem;
    font-size:24/@rem;
    border-radius: 20/@rem;
        color: #ff5050;
        background-color: #fff;
        &:after{
                content: '';
    display: inline-block;
        background: url('./footerplbannerbackgroundcoverjiantou.png') no-repeat center center;
    background-size: contain;
    width: 14/@rem;
    height: 14/@rem;
    margin-left: 6/@rem;
        }
}
</style>
