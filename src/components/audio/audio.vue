<template>
    <section class="video">
        <h1>{{audio.title}}</h1>
        <audio :src="audio.url" controls></audio>
    </section>
</template>

<script>
import {audioAxios} from '@/api/detailend.js'
export default {
  name: 'videoDetail',
  data () {
    return {
      audio: []
    }
  },
  methods: {
    audioData () {
      audioAxios(this.$route.query.id).then(data => {
        this.audio = data.data.data
        console.log(this.audio)
      })
    }
  },
  created () {
    this.audioData()
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
