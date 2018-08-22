<template>
    <section @click.prevent.stop="showhide($event)" v-if="data.photos" class="album">
      <div class="headero flex flex-pack-justify flex-align-center">
        <backbutton :imgnumber="1"></backbutton>
        <div class="l">
          <span @click="useda">
            <touxiangimg :img="touxiangmimg.img"></touxiangimg>
          </span>
          <img @click="downloadclick" class="dkso" src="./more.png" alt="">
        </div>
      </div>
              <albumslider @duratfun="duratfun" @currentfun="currentfun">

                <li v-for="(item,index) in data.photos" :key="index">
                    <img :src="item.img" alt="">
                    <!-- <p>{{item.tile}}</p> -->
                </li>
              </albumslider>
              <!-- 图集说明 -->
        <div v-show="albumshow" v-if="durationIndex>0" class="protxt flex">

            <!-- 图片说明 -->
            <div class="albumtxt flex-1">
              <li v-show="index === currentIndex" v-for="(item,index) in data.photos" :key="index">
                {{item.title}}
              </li>
            </div>

            <!-- 当前length显示 -->
            <div class="albumlength">
                <span class="da">{{currentIndex + 1}}</span><span>/{{durationIndex}}</span>
            </div>

        </div>
        <album-pro
         v-show="!albumshow"
          :currentIndex="currentIndex"
           :durationIndex="durationIndex" ></album-pro>
    </section>
</template>

<script>
import touxiangimg from '@/base/detail-touxiang/detail-touxiang.vue'
import backbutton from '@/base/back-button/back-button.vue'
import {userdetailAxios} from '@/api/user.js'
import {albumAxios} from '@/api/detailend'
import albumslider from '@/base/album-slider/albumSlider.vue'
import albumPro from '@/base/detaillist/album-pro.vue'
import {download} from '@/api/downLoad.js'
export default {
  components: {
    albumslider,
    touxiangimg,
    backbutton,
    albumPro
  },
  data () {
    return {
      data: [],
      touxiangmimg: [],
      currentIndex: 0,
      durationIndex: 0,
      albumshow: true // 图集说明隐藏与显示
    }
  },
  methods: {

    downloadclick () {
      download()
    },

    // 点击图集页面隐藏或显示图集说明
    showhide (e) {
      if (e.target.className === 'dkso') {
        return
      }
      this.albumshow = !this.albumshow
    },

    // 子组件传来的数据
    currentfun (obj) {
      this.currentIndex = obj.currentIndex
    },
    duratfun (obj) {
      this.durationIndex = obj.durationIndex
    },

    // 请求图片与作者头像数据
    articleData () {
      console.log(1)
      albumAxios(this.$route.query.id).then(res => {
        this.data = res.data.data
      })
      userdetailAxios(this.$route.query.uid).then(res => {
        this.touxiangmimg = res.data.data
      })
    },
    useda () {
      this.$router.push({
        name: 'userlist',
        query: {
          uid: this.$route.query.uid
        }
      })
    }

  },
  created () {
    this.articleData()
  }
}
</script>
<style lang="less" scoped>
@import '~common/less/common.less';

.albumtxt{
  font-size:30/@rem;
  padding:0 30/@rem;
  padding-top:20/@rem;
  padding-bottom:20/@rem;
  overflow-x:scroll;
      transform: translate3d(0,0,0);
  li{
    // height:100%;
    // overflow-y:scroll;
    section{
      // height:100%;
    }
  }
}
.headero{
margin-top:20/@rem;
}
.album{
  width:100%;
  height:100%;
  background:#000;
  overflow:hidden;
  position:fixed;
  top:0;
  left:0;
}

.dkso{
  width:60/@rem;
  margin-right:30/@rem;
}
.histroty{
  img{
    width:22/@rem;
  }
}
.protxt{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    color:#fff;
    height:220/@rem;
    background:rgba(0,0,0,.5);
}
.albumlength{
    border-left:1px solid #fff;
    text-align: center;
    font-size:40/@rem;
    transform: translate3d(0,0,0);
    .da{
        font-size:56/@rem;
    }
}
.albumlength{
    width:180/@rem;
}
</style>
