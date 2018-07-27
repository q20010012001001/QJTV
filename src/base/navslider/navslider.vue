<template>
    <div class="wrapper" ref="wrapper">
        <div class="content flex" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  props: ['datanav'],
  mounted () {
    setTimeout(() => {
      this.clientUlWIDTH()

      this.slider = new BetterScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        click: true,
        bounce: { // 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画
          left: false,
          right: false
        }
      })

      this._indexnav()
    }, 20)
  },
  methods: {

    // 更新導航index
    _indexnav () {
      this.$nextTick(() => {
        let index = this._navinitoffset()
        this.slider.refresh()
        this.slider.scrollToElement(this.$refs.content.children[index], 0)
      })
    },

    // 获取初始化导航的index
    _navinitoffset () {
      let childrena = this.$refs.content.children
      let index = 0
      for (let i = 0; i < childrena.length; i++) {
        let reg = new RegExp('(^|\\s)' + 'router-link-exact-active' + '(\\s|$)')
        if (reg.test(childrena[i].className)) {
          index = i
        }
      }
      return index
    },

    // 设置ul宽度
    clientUlWIDTH () {
      let ul = this.$refs.content.children
      let ulwidth = 0
      for (let i = 0; i < ul.length; i++) {
        let clientwidth = ul[i].clientWidth
        ulwidth += clientwidth
      }
      this.$refs.content.style.width = ulwidth + 'px'
    }

  },
  activated () {
    this._indexnav()
  }
}
</script>

<style>

</style>
