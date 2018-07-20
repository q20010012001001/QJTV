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
        startX: this._navinitoffset()
      })
    }, 20)
  },
  methods: {

    // 获取初始化导航的offsetLeft
    _navinitoffset () {
      let childrena = this.$refs.content.children
      let index = 0
      for (let i = 0; i < childrena.length; i++) {
        let reg = new RegExp('(^|\\s)' + 'router-link-exact-active' + '(\\s|$)')
        if (reg.test(childrena[i].className)) {
          index = childrena[i].offsetLeft
        }
      }
      return -index
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

  }
}
</script>

<style>

</style>
