<template>
    <section class="video">
      <!-- <scroll :bounceTop="false" class="videosection"> -->
        <common @detailJS="detailJS" :data="video">
          <div class="videoContent">
            <video ref="video" :src="video.url" controls></video>
            <div class="desc" v-html="video.desc"></div>
          </div>
        </common>
      <!-- </scroll> -->
    </section>
</template>

<script>
import {videoAxios} from '@/api/detailend.js'
import common from '@/base/detaillist/common.vue'
// import scroll from '@/base/scroll/scroll.vue'
export default {
  name: 'videoDetail',
  data () {
    return {
      video: []
    }
  },
  components: {
    common
    // scroll
  },
  methods: {
    videoData () {
      videoAxios(this.$route.query.id).then(data => {
        this.video = data.data.data
      })
    },
    detailJS () {
      setTimeout(() => {
        let videoasss = this.$refs.video
        videoasss.style.height = (videoasss.clientWidth * 9 / 16) + 'px'
      }, 20)
    }
  },
  created () {
    this.videoData()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
// .videosection{
//   position:fixed;
//   top:0;
//   left:0;
//   width:100%;
//   height:100%;
// }
.desc span, .desc p, .desc div, .desc header, .desc article,.desc {
    font-size: 0.5rem !important;
    line-height: 1.5em !important;
}
.videoContent{
  padding:0 30/@rem;
  video{
    width:100%;
    background:#000;
  }
}
video{
  margin-top:20/@rem;
}
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
    }

    .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
    }
</style>
