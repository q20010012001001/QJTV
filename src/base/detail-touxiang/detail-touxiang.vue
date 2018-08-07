<template>
    <img :src="img" alt="">
</template>

<script>
export default {
  props: ['img']
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
