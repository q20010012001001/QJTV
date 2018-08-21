<template>
    <div class="audio" ref="audifu">
        <audio ref="audio" :src="audiodata.url"></audio>
        <div class="title flex flex-align-center">
            <div class="playpause" @click="_playpause">
                <span v-show="!state"><img src="./audio_play4.jpg" alt=""></span>
                <span v-show="state"><img src="./audio_play3.gif" alt=""></span>
            </div>
            <div class="titleopsk omit">{{audiodata.title}}</div>
            <div v-show="!godgodstart" class="loader-inner ball-pulse"><div></div> <div></div> <div></div></div>
        </div>
        <div class="pro flex flex-pack-justify">
            <span>{{audiodata.from}}</span>
            <span>{{audiodata.time?audiodata.time.split(' ')[0]:''}}</span>
            <span>播放次数: {{audiodata.visitNum}}</span>
        </div>
        <div ref="progress" class="progress" @touchstart="ontouchstart" @touchmove.prevent.stop="ontouchmove">
            <div ref="curr" class="curr">
                <span></span>
            </div>
            <div class="durr" ref="durr"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['audiodata'],
  data () {
    return {
      state: false, // 播放状态
      duration: 0, // 总时长
      current: 0, // 当前进度
      buffered: 0, // 缓冲进度
      godgodstart: false // 当前状态是否可播放
    }
  },
  methods: {

    //   绑定事件(canplay,timeupdate)
    addevent () {
      this.$refs.audio.addEventListener('canplay', this._duration)
      this.$refs.audio.addEventListener('timeupdate', this._current)
      this.$refs.audio.addEventListener('ended', this._playpause)

      // 播放状态loading效果设置
      this.$refs.audio.addEventListener('play', this._godgod)
      this.$refs.audio.addEventListener('canplay', this._godgod)
      this.$refs.audio.addEventListener('waiting', this._godgodfalse)
      this.$refs.audio.addEventListener('stalled', this._godgodfalse)
      this.$refs.audio.addEventListener('error', this._godgodfalse)
      this.$refs.audio.addEventListener('loadstart', this._godgodfalse)
      this.$refs.audio.addEventListener('playing', this._godgod)
    },

    // 解绑事件
    removeaddevent () {
      this.$refs.audio.removeEventListener('canplay', this._duration)
      this.$refs.audio.removeEventListener('timeupdate', this._current)
      this.$refs.audio.removeEventListener('ended', this._playpause)

      // 播放状态loading效果设置
      this.$refs.audio.removeEventListener('play', this._godgod)
      this.$refs.audio.removeEventListener('canplay', this._godgod)
      this.$refs.audio.removeEventListener('waiting', this._godgodfalse)
      this.$refs.audio.removeEventListener('stalled', this._godgodfalse)
      this.$refs.audio.removeEventListener('error', this._godgodfalse)
      this.$refs.audio.removeEventListener('loadstart', this._godgodfalse)
      this.$refs.audio.removeEventListener('playing', this._godgod)
    },

    // 改变音乐播放器的状态
    _godgod () {
      this.godgodstart = true
    },
    _godgodfalse () {
      this.godgodstart = false
    },

    // 获取歌曲总进度
    _duration () {
      this.duration = parseInt(this.$refs.audio.duration)

      //   算出歌曲缓冲进度条百分比
      if (this.$refs.audio.buffered.length > 0) {
        this.buffered = this.$refs.audio.buffered.end(0)
      }
      for (let i = 0; i < this.$refs.audio.buffered.length; i++) {
        if (this.$refs.audio.currentTime < this.$refs.audio.buffered.end(i) && this.$refs.audio.buffered) {
          this.buffered = this.$refs.audio.buffered.end(i)
        }
      };
      let buff = parseInt((this.buffered / this.$refs.audio.duration) * 100)
      this.$refs.durr.style.width = `${buff}%`
    },

    // 获取歌曲进度
    _current () {
      this.current = parseInt(this.$refs.audio.currentTime)

      //   算出来歌曲进度条的百分比
      let lo = this.current / this.duration * 100
      this.$refs.curr.style.width = `${lo}%`
    },

    // 暂停与播放
    _playpause () {
      if (this.state) {
        this.state = false
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
        this.state = true
      }
    },

    // 点击控制音乐
    ontouchstart (e) {
      let tochsx = e.touches[0].pageX | 0
      let ms = tochsx - this.$refs.audifu.offsetLeft
      let msa = ms / this.$refs.progress.clientWidth
      let cuam = this.duration * msa
      this.$refs.audio.currentTime = cuam
    },

    // 滑动控制音乐
    ontouchmove (e) {
      let pois = e.touches[0].pageX - this.$refs.audifu.offsetLeft
      let ks = pois / this.$refs.progress.clientWidth
      let ms = this.duration * ks
      this.$refs.audio.currentTime = ms
    }
  },
  mounted () {
    this.addevent()
  },
  beforeDestroy () {
    this.removeaddevent()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.titleopsk{
    width:500/@rem;
    margin-right:20/@rem;
}
.loader-inner{
  width:40/@rem;
}
.audio{
    position:relative;
}
.progress{
    position:absolute;
    bottom:-10/@rem;
    height:10/@rem;
    width:100%;
    left:0;
    .curr{
        background:#407600;
        width:0%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        z-index:2;
        span{
            width:20/@rem;
            height:20/@rem;
            border:4/@rem solid #407600;
            background: #fff;
            display:block;
            border-radius:50%;
            position:absolute;
            right:-10/@rem;
            top:-8/@rem;
        }
    }
    .durr{
        width:0%;
        background: #9d9d9d;
        height:100%;
position:absolute;
        top:0;
        left:0;
        z-index:1;
    }
}
.audio{
    margin:30/@rem;
    border:1px solid #e1e1e1;
    padding:20/@rem;
}
.audio[data-dpr='2']{
    border:2px solid #e1e1e1;
}
.audio[data-dpr='3']{
    border:3px solid #e1e1e1;
}
.title{
    margin-bottom:20/@rem;
    div{
    font-size:30/@rem;

    }
}
.playpause{
    margin-right:30/@rem;
    img{
        width:50/@rem;
    }
}
.pro{
    color:#9d9d9d;
    margin-bottom:5/@rem;
}
.ball-pulse > div:nth-child(1) {
  -webkit-animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -moz-animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -ms-animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -o-animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.ball-pulse > div:nth-child(2) {
  -webkit-animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -moz-animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -ms-animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -o-animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div:nth-child(3) {
  -webkit-animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -moz-animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -ms-animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  -o-animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: scale 0.75s 0.36s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}
.ball-pulse > div {
  background-color: #407600;
  width: 1.6/@rem;
  height: 13/@rem;
  border-radius: 100%;
  margin: 1.1/@rem;
  -webkit-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
@keyframes scale {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    -o-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes scale {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    -o-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-o-keyframes scale {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    -o-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-moz-keyframes scale {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    -o-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
  80% {
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    -o-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    -o-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
@-o-keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    -o-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
@-moz-keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    -o-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -ms-transform: scale(0.3);
    transform: scale(0.3);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
</style>
