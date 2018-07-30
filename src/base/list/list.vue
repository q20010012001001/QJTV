<template>
        <!-- 推荐数据 -->
        <div class="list">
          <li v-for="(item,index) in tuijianlist" :key="index">

            <!-- 二张图 -->
                        <div v-if="index%3==0&&index!=0&&item.type==0" class="twoImage">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="twoimg flex-pack-justify flex">
                  <div class="flex-1"><img :src="item.img |imgUrlStr(0,item)" alt=""></div>
                  <div class="flex-1">
                    <img :src="item.img |imgUrlStr(1,item)" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

          <!-- 没图 -->
          <div v-else-if="(item.type == 1 && item.img.match(/default.png/))" class="noImage">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
          </div>

          <!-- 大图 -->
          <div class="pongge" v-else-if="index%7==0&&index!=0&&item.type==0">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="pongeImg flex">
                    <img class="flex-1" :src="item.img |imgUrlStr(0,item)" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
          </div>

<!-- 三张图 -->
            <div class="treeImage" v-else-if="(index%5==0&&index!=0&&item.type==0) || (item.type==1&&item.img2&&item.img3) || (item.type==2&&item.img2&&item.img3)">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="treeimg flex-pack-justify flex">
                  <div><img :src="item.img |imgUrlStr(0,item)" alt=""></div>
                  <div><img :src="item.img |imgUrlStr(1,item)" alt=""></div>
                  <div>
                    <img :src="item.img |imgUrlStr(2,item)" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

            <!-- 一张图 -->
            <div v-else-if="item.type == 0 || (item.type==1&&item.img&&!item.img.match(/default.png/)) || (item.type==2&&item.img) || (item.type==4&&item.img)" class="oneImage">
              <div @click="linkrouter(item)" class="aim flex flex-align-center flex-pack-justify">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="imgpro">
                  <img :src="item.img" alt="">
                  <span v-if="item.type === '0'" class="write"></span>
                </div>

              </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
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
    },
    imgUrlStr (val, a, item) {
      if (item.type === '0') {
        let lastindedxof = val.lastIndexOf('-')
        let yi = val.substring(0, lastindedxof)
        let lzui = val.substring(lastindedxof)
        let er = lzui.split('.')[1]
        let arr = []
        for (let i = 1; i < 4; i++) {
          arr.push(`${yi}-${i}.${er}`)
        }
        return arr[a]
      } else {
        return [item.img, item.img2, item.img3][a]
      }
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
@import "~common/less/common.less";
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
