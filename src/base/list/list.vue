<template>
        <!-- 推荐数据 -->
        <div class="list">
          <li class="flex flex-align-center flex-pack-justify" v-for="(item,index) in tuijianlist" :key="index">
            <div class="aim">
              <div class="title">{{item.title}}</div>
              <div class="pro flex flex-align-center">
                <span class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                <span>{{item.time | splittimer}}</span>
                <!-- <span>{{item.visitNum}}</span> -->
              </div>
            </div>
            <div class="imgpro">
              <img :src="item.img" alt="">
              <span class="write"></span>
            </div>
          </li>
        </div>
</template>

<script>
export default {
  props: ['tuijianlist'],
  name: 'list',
  filters: {
    splittimer (val) {
      return val.split(' ')[0]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
li{
  padding:28/@rem 0;
  margin: 0 30/@rem;
   border-bottom:1px solid #d1d1d1;
   .title{
     font-size:40/@rem;
   }
   .pro{
     margin-top: 20/@rem;
     span{
       margin-right:20/@rem;
     }
     .img{
       img{
         width:40/@rem;
         border-radius:50%;
         margin-right:10/@rem;
       }
     }
   }
  .imgpro{
    margin-left:20/@rem;
    img{
      width:200/@rem;
    }
  }
}
[data-dpr="3"] li{
    border-bottom:3px solid #d1d1d1;
}
[data-dpr="2"] li{
    border-bottom:2px solid #d1d1d1;
}
</style>
