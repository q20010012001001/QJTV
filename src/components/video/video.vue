<template>
    <section class="video">
        <h1>{{video.title}}</h1>
        <video :src="video.url" controls></video>
    </section>
</template>

<script>
import {videoAxios} from '@/api/detailend.js'
export default {
  name: 'videoDetail',
  data () {
    return {
      video: []
    }
  },
  methods: {
    videoData () {
      videoAxios(this.$route.query.id).then(data => {
        this.video = data.data.data
        console.log()
      })
    }
  },
  created () {
    this.videoData()
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
    }

    .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
    }
</style>
