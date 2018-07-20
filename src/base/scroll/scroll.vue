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
  methods: {

    _inintscroll () {
      this.scroll = new BTscroll(this.$refs.wrapper, {
        scrollbar: true
      })

      // // 派发滚动到底部事件，用于上拉加载
      // this.scroll.on('scrollEnd', () => {
      //   if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //     // 所有数据加载完毕后
      //     this.$on('infinitescroll.loadedDone', () => {
      //       this.isLoading = false
      //       this.isDone = true
      //     })
      //     // 单次请求数据加载完毕后
      //     this.$on('infinitescroll.finishLoad', (ret) => {
      //       this.isLoading = false
      //     })
      //     // 重新初始化
      //     this.$on('infinitescroll.reInit', () => {
      //       this.isLoading = false
      //       this.isDone = false
      //     })
      //     this.$emit('scrollToEnd')
      //   }
      // })
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
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
