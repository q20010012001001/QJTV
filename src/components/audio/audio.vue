<template>
    <section class="video">
      <loadingvue v-show="!showfalse"></loadingvue>
      <div v-show="showfalse">
          <headerdetail ref="header" :data="audio"></headerdetail>
          <div class="audioContent">
            <audiode :audiodata="audio"></audiode>
            <!-- <audio :src="audio.url" controls></audio> -->
            <div class="desc" v-html="audio.desc"></div>
          </div>
          <tuijian ref="tuijian"></tuijian>
          <bottom-download></bottom-download>
        </div>

    </section>
</template>

<script>
import {audioAxios} from '@/api/detailend.js'
import loadingvue from '@/base/loading/loading.vue'
import headerdetail from '@/base/detaillist/header.vue'
import tuijian from '@/base/detaillist/tuijian.vue'
import audiode from '@/base/audio/audio.vue'
import bottomDownload from '@/base/download/bottom2-download.vue'

export default {
  name: 'audioDetail',
  data () {
    return {
      audio: [],
      showfalse: false
    }
  },
  components: {
    loadingvue,
    headerdetail,
    tuijian,
    audiode,
    bottomDownload
  },
  methods: {
    audioData () {
      audioAxios(this.$route.query.id).then(data => {
        this.audio = data.data.data
        this.$nextTick(() => {
          // 延遲加載詳情頁
          setTimeout(() => {
            this.showfalse = true
          }, 500)
        })
      })
    }
  },
  created () {
    this.audioData()
  },
  watch: {
    $route () {
      document.body.scrollTop = 0
      this.showfalse = false
      this.audioData()
      this.$refs.header.userdata()
      this.$refs.tuijian.ajaxtuijian()
      this.$refs.tuijian.ajaxtuijianguanggao()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
audio{
  padding:0 30/@rem;
  margin:0 auto;
}
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
    }

    .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
    }
    .desc{
      padding:0 30/@rem;
    }
</style>
