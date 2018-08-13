<template>
    <section ref="albumSlider" class="albumSlider">

        <!-- 图集模块 -->
        <div class="content" ref="content">
            <slot></slot>
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
  methods: {

    //   初始化better-scroll
    betterscrollinit () {
      this.slider = new BTscroll(this.$refs.albumSlider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 取消回弹效果
        // probeType: 2,
        click: true,
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
        this.$emit('currentfun', {
          currentIndex: index
        })
      })
    },

    // 动态设置li与li父级的宽度
    initwidth () {
      let doucmentwidth = document.body.clientWidth
      let len = this.$refs.content.children

      // 初始化总共多少个
      this.$emit('duratfun', {
        durationIndex: len.length
      })

      // 计算图片所有总宽度
      let zongwidth = doucmentwidth
      if (len.length > 1) { // 防止只有一张图片的情况
        zongwidth = zongwidth * (len.length + 2)
      }
      for (let i = 0; i < len.length; i++) {
        len[i].style.width = `${doucmentwidth}px`
      }
      this.$refs.content.style.width = `${zongwidth}px`
    },

    goToPage (index) {
      this.slider && this.slider.goToPage(index, 0, 0)
      this.$emit('currentfun', {
        currentIndex: index
      })
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

.albumSlider{
    height:100%;
}

.content{
    height:100%;

}
li /deep/ img{
  max-width:100%;
    max-height:100%;
    height:auto;
    display:inline-block;
            position:absolute;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            width:100%;
}
li{
      float: left;
        position:relative;
        height:100%;
        img{
    //       max-width:100%;
    // max-height:100%;
    // height:auto;
    // display:inline-block;
    //         position:absolute;
    //         top:0;
    //         bottom:0;
    //         left:0;
    //         right:0;
    //         margin:auto;
    //         width:100%;
        }
    }
</style>
