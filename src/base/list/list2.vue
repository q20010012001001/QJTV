<template>
    <div class="list">
        <li v-for="(item,index) in tuijianlist" :key="index">
                      <!-- 没图 -->
          <div v-if="(item.type == 1&& !item.imgs[0].img)" class="noImage">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
          </div>

          <!-- 三张图 -->
            <div class="treeImage" v-else-if="(item.type==0&&item.imgs[1]&&item.imgs[2]) || (item.type==1&&item.imgs[1]&&item.imgs[2]) || (item.type==2&&item.imgs[1]&&item.imgs[2])">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div v-if="item.type == 0" class="treeimg flex-pack-justify flex">
                  <div><img v-lazy="item.imgs[0].img" alt=""></div>
                  <div><img v-lazy="item.imgs[1].img" alt=""></div>
                  <div>
                    <img v-lazy="item.imgs[2].img" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
                <div v-else class="treeimg flex-pack-justify flex">
                  <div><img v-lazy="item.imgs[0].img" alt=""></div>
                  <div><img v-lazy="item.imgs[1].img" alt=""></div>
                  <div>
                    <img v-lazy="item.imgs[2].img" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>
<!-- 一张图 -->
            <div v-else-if="item.type == 0 || (item.type==1&&item.imgs[0]) || (item.type==2&&item.imgs[0]) || (item.type==4&&item.imgs[0])" class="oneImage">
              <div @click="linkrouter(item)" class="aim flex flex-align-center flex-pack-justify">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="imgpro">
                  <img v-lazy="item.imgs[0].img" alt="">
                  <span v-if="item.type == '0'" class="write"></span>
                </div>

              </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>

            <!-- 音樂 -->
            <div class="audio" v-else-if="item.type == 3">
              <div @click="linkrouter(item)" class="h5audioimg flex flex-align-center">
                <img src="./h5_audio.png" alt="">
                <span class="title">{{item.title}}</span>
              </div>
              <div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
const video = 0 // 视频
const article = 1 // 图文
const album = 2 // 图集
const audio = 3 // 音频
const advertisement = 4 // 广告
export default {
  props: ['tuijianlist'],
  name: 'list2',
  filters: {
    splittimer (val) {
      return val.split(' ')[0]
    }
  },
  methods: {
    Collection (val) {
      // alert(1)
    },
    linkrouter (val) {
      if (val.type === article) {
        this.$router.push({
          name: 'article',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (val.type === video) {
        this.$router.push({
          name: 'video',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (val.type === album) {
        this.$router.push({
          name: 'album',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (val.type === audio) {
        this.$router.push({
          name: 'audio',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (val.type === advertisement) {
        location.href = val.url
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('listscrollrefsh')
    }, 20)
  }
}
</script>

<style lang="less" scoped>
@import "~common/less/common.less";
.h5audioimg img{
  width:50/@rem;
  margin-right:20/@rem;
}
.Collection{
  img{
    width:20/@rem;
    margin-right:6/@rem;
  }
}
li {
  .pongge{
    .pongeImg{
      width:100%;
      position:relative;
      margin-top:20/@rem;
      .write{
        left:0;
        right:0;
        bottom:0;
        top:0;margin:auto;
        width:68/@rem;
        height:68/@rem;
      }
      img{
        height:450/@rem;
        display:inline-block;
      }
    }
  }
  padding: 28 / @rem 0;
  margin: 0 30 / @rem;
  border-bottom: 1px solid #d1d1d1;
  .title {
    font-size: 40 / @rem;
  }
  .write{
        background:url('./icon_video_half2.png') no-repeat;
        background-size:cover;
        width:52/@rem;
        height:52/@rem;
        display:inline-block;
        position:absolute;
        right:15/@rem;
        bottom:20/@rem;
      }
  .pro {
    margin-top: 20 / @rem;
    span {
      margin-right: 20 / @rem;
    }
    .img {
      img {
        width: 40 / @rem;
        border-radius: 50%;
        margin-right: 10 / @rem;
      }
    }
  }
  .imgpro {
    margin-left: 20 / @rem;
    position:relative;
    width: 200 / @rem;
      height: 128 / @rem;
    img {
      width: 200 / @rem;
      height: 128 / @rem;
    }
  }
  .treeImage{
    .treeimg{
      position:relative;
      margin-top:20/@rem;
      div img{
        width:225/@rem;
        height:154/@rem;
      }

    }
  }
  .twoImage{
    .twoimg{
      position:relative;
      margin-top:20/@rem;
      div{
        &:nth-of-type(1){
          margin-right:10/@rem;
        }
      }
      div img{
        width:100%;
        height:180/@rem;
      }
      .write{
        background:url('./icon_video_half2.png') no-repeat;
        background-size:cover;
        width:52/@rem;
        height:52/@rem;
        display:inline-block;
        position:absolute;
        right:20/@rem;
        bottom:20/@rem;
      }
    }
  }
}
[data-dpr="3"] li {
  border-bottom: 3px solid #d1d1d1;
}
[data-dpr="2"] li {
  border-bottom: 2px solid #d1d1d1;
}
</style>
