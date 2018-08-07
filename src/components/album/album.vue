<template>
    <section v-if="data.photos" class="album">
      <div class="headero flex flex-pack-justify flex-align-center">
        <backbutton :imgnumber="1"></backbutton>
        <div class="l">
          <span @click="useda">
            <touxiangimg :img="touxiangmimg.img"></touxiangimg>
          </span>
          <img class="dkso" src="./more.png" alt="">
        </div>
      </div>
              <albumslider :dataalbum="data.photos">

                <li v-for="(item,index) in data.photos" :key="index">
                    <img :src="item.img" alt="">
                    <!-- <p>{{item.tile}}</p> -->
                </li>
              </albumslider>

    </section>
</template>

<script>
import touxiangimg from '@/base/detail-touxiang/detail-touxiang.vue'
import backbutton from '@/base/back-button/back-button.vue'
import {userdetailAxios} from '@/api/user.js'
import {albumAxios} from '@/api/detailend'
import albumslider from '@/base/album-slider/albumSlider.vue'
export default {
  components: {
    albumslider,
    touxiangimg,
    backbutton
  },
  data () {
    return {
      data: [],
      touxiangmimg: []
    }
  },
  methods: {
    articleData () {
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
li{
  // width:100%;
  // height:100%;
  float: left;
  img{
    max-width:100%;
    max-height:100%;
    height:auto;
    display:inline-block;
}
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
</style>
