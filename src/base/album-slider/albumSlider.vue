<template>
    <section ref="albumSlider" class="albumSlider">

        <!-- 图集模块 -->
        <div class="content" ref="content">
            <slot></slot>
        </div>

        <!-- 图集说明 -->
        <div class="protxt flex">

            <!-- 图片说明 -->
            <div class="albumtxt flex-1">
              <li v-show="index === currentIndex" v-for="(item,index) in dataalbum" :key="index">
                {{item.title}}
              </li>
            </div>

            <!-- 当前length显示 -->
            <div class="albumlength">
                <span class="da">{{currentIndex + 1}}</span><span>/{{durationIndex}}</span>
            </div>

        </div>
    </section>
</template>

<script>
import BTscroll from 'better-scroll'
import scroll from '@/base/scroll/scroll.vue'
export default {
  components: {
    scroll
  },
  props: {
    dataalbum: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentIndex: 0,
      durationIndex: 0
    }
  },
  methods: {

    //   初始化better-scroll
    betterscrollinit () {
      this.slider = new BTscroll(this.$refs.albumSlider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        // probeType: 2,
        snap: {
          threshold: 0.3,
          loop: true
        }
      })

      this.slider.on('scrollEnd', () => {
        let index = this.slider.getCurrentPage().pageX
        // console.log(index)
        // if (index <= 0) {
        //   index = this.durationIndex
        // }
        this.currentIndex = index
      })
    },

    // 动态设置li与li父级的宽度
    initwidth () {
      let doucmentwidth = document.body.clientWidth
      let len = this.$refs.content.children
      this.durationIndex = len.length
      let zongwidth = doucmentwidth * (len.length + 2)
      for (let i = 0; i < len.length; i++) {
        len[i].style.width = `${doucmentwidth}px`
        console.log(doucmentwidth)
      }
      this.$refs.content.style.width = `${zongwidth}px`
    }
  },
  mounted () {
    setTimeout(() => {
      this.initwidth()
      this.betterscrollinit()
    }, 20)
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
.albumSlider{
    height:100%;
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

.content{
    height:100%;
    li{
        position:relative;
        height:100%;
        img{
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            width:100%;
        }
    }
}
</style>
