<template>
    <section class="video">
        <common @detailJS="detailJS" :data="video">
          <div class="videoContent">
            <video ref="video" :src="video.url" controls></video>
            <div class="desc" v-html="video.desc"></div>
          </div>
        </common>
    </section>
</template>

<script>
import {videoAxios} from '@/api/detailend.js'
import common from '@/base/detaillist/common.vue'
export default {
  name: 'videoDetail',
  data () {
    return {
      video: []
    }
  },
  components: {
    common
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
