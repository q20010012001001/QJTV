<template>
    <section class="getcate">
        <ul class="flex flex-pack-justify">
            <li class="flex flex-v" v-for="(item,index) in getcatelist" :key="index">
                <div class="img">
                    <img :src="item.img" alt="">
                </div>
                <div class="title omit">
                    {{item.title}}
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  props: {
    getcatelist: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
ul{
        flex-wrap: wrap;
        li{
            margin:20/@rem 0;
        }
}
img{
    height:120/@rem;
}
.img{
    text-align: center;
}
.title{
    width:135/@rem;
    text-align: center;
    padding:0 20/@rem
}
</style>
