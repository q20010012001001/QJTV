<template>
        <!-- 推荐数据 -->
        <div class="list">
          <li class="flex flex-align-center flex-pack-justify" v-for="(item,index) in tuijianlist" :key="index">
            <div class="aim">
              <div @click="linkrouter(item)" class="title">{{item.title}}</div>
              <div class="pro flex flex-align-center">
                <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                <span>{{item.time | splittimer}}</span>
                <!-- <span>{{item.visitNum}}</span> -->
              </div>
            </div>
            <div @click="linkrouter(item)" class="imgpro">
              <img :src="item.img" alt="">
              <span class="write"></span>
            </div>
          </li>
        </div>
</template>

<script>
const video = '0' // 视频
const article = '1' // 图文
const album = '2' // 图集
const audio = '3' // 音频
const advertisement = '4' // 广告
export default {
  props: ['tuijianlist'],
  name: 'list',
  filters: {
    splittimer (val) {
      return val.split(' ')[0]
    }
  },
  methods: {
    linkrouter (val) {
      if (val.type === article) {
        this.$router.push({
          name: 'article',
          query: {
            id: val.id
          }
        })
      } else if (val.type === video) {
        this.$router.push({
          name: 'video',
          query: {
            id: val.id
          }
        })
      } else if (val.type === album) {
        this.$router.push({
          name: 'album',
          query: {
            id: val.id
          }
        })
      } else if (val.type === audio) {
        this.$router.push({
          name: 'audio',
          query: {
            id: val.id
          }
        })
      } else if (val.type === advertisement) {
        location.href = val.url
      }
    },
    linkuser (val) {
      this.$router.push({
        name: 'userlist',
        query: {
          uid: val
        }
      })
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
      height:128/@rem;
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
