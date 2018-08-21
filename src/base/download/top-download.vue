<template>
    <section>
        <div class="f flex flex-pack-justify flex-align-center">
            <div class="left flex flex-align-center">
                <img src="@/common/image/logo.png" alt="">
                <span>全椒广播电视台</span>
            </div>
            <div class="right flex flex-align-center flex-pack-center">
                立即打开
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.f{
    height:100%;

}
section{
    background: rgba(0, 0, 0, 0.7);
    height:80/@rem;
}
.left{
    img{
        margin-right:10/@rem;
        width:48/@rem;
    }
    margin-left:40/@rem;
    font-size:24/@rem;
    color:#fff;
    font-weight:bold;
}
.right{
    margin-right:20/@rem;
    font-size:24/@rem;
    width:140/@rem;
    height:40/@rem;
    border-radius:10/@rem;
    color:#fff;
        background-color: #ff5050;
}
</style>
