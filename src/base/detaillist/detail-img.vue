<template>
    <div class="albumsks">
        <span @click.stop.prevent="hide" class="hide"><img src="./chaohao.png" alt=""></span>
        <album-list
         @duratfun="duratfun2"
          @currentfun="currentfun2"
           ref="albumlist">
            <li v-html="item" v-for="(item,index) in filterimglist" :key="index"></li>
        </album-list>
        <album-pro
         :currentIndex="currentfun"
          :durationIndex="duratfun"></album-pro>
    </div>
</template>

<script>
import albumList from '@/base/album-slider/albumSlider.vue'
import albumPro from '@/base/detaillist/album-pro.vue'

export default {
  data () {
    return {
      duratfun: 0,
      currentfun: 0
    }
  },
  props: {
    imglist: { // 后台传来的详情页内容
      default: ''
    }
  },
  components: {
    albumList,
    albumPro
  },
  computed: {
    filterimglist () {
      let ops = this.imglist
      let k = ops.match(/<img[^>]+>/g)
      return k
    }

  },
  methods: {

    goToPage (index) {
      this.$refs.albumlist.goToPage(index)
    },

    //   点击浏览图片差号隐藏
    hide () {
      this.$emit('showishide', false)
    },
    duratfun2 (val) {
      this.duratfun = val.durationIndex
    },
    currentfun2 (val) {
      this.currentfun = val.currentIndex
    }
  },
  mounted () {
    // this.fitlerlisk()
  }

}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.hide img{
    width:100%;
    height:100%;
    display:inline-block
}
.hide{
    position:absolute;
    z-index:2;
    right:30/@rem;
    top:30/@rem;
    width:50/@rem;
}
.albumsks{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    height:100%;
    background: #000;
}
</style>
