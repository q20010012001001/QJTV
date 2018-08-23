<template>
    <section ref="wrapper">
        <div>

          <!-- <div class="top-tip"><span>下拉刷新</span></div> -->
          <slot></slot>
          <!-- <div class="bottom-tip"><span>查看更多</span></div> -->

        </div>
    </section>
</template>

<script>
import BTscroll from 'better-scroll'
export default {
  props: {
    pullUpLoad: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    },
    bounceTop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {

    _inintscroll () {
      if (!this.$refs.wrapper) {
        return
      }

      this.scroll = new BTscroll(this.$refs.wrapper, {
        scrollbar: {
          fade: false,
          interactive: true
        },
        click: true,
        probeType: this.probeType,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        bounce: {
          bottom: false,
          top: this.bounceTop
        },
        mouseWheel: {
          invert: false
        }
        // preventDefaultException: {
        //   tagName: /^(LI|DIV|SPAN|IMG)$/
        // }
      })

      let me = this
      this.scroll.on('scroll', (pos) => {
        me.$emit('scrollpos', pos)
      })

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
    },
    _initPullDownRefresh () {
      this.scroll.on('pullingDown', () => {
        this.$emit('pullingDown')
      })
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    y () {
      return this.scroll.y
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    finishPullDown () {
      this.scroll && this.scroll.finishPullDown()
    }
  },
  mounted () {
    setTimeout(() => {
      this._inintscroll()
    }, 20)
  }
}
</script>

<style lang="less" scoped>
.list{
    width:100%;
    height:auto;
    position:relative;
}
</style>
