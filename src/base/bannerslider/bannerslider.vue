<template>
<div class="wrap" ref="ref">
    <div class="content clearfix" ref="content">
        <slot></slot>
    </div>
    <ol class="border-box flex flex-align-center flex-pack-justify">
        <li :class="{active:currentIndex === index}" v-for="(item,index) in titledata" :key="index">{{item}}</li>
        <div class="num">
{{currentIndex+1}} / {{titledata.length}}
        </div>
    </ol>
</div>
</template>

<script>
import BTscroll from 'better-scroll'
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  props: ['data'],
  computed: {
    titledata () {
      let op = []
      this.data.forEach((val) => {
        op.push(val.title)
      })
      return op
    }
  },
  methods: {
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, 3000)
    },

    // 初始化beter-scroll
    betterscrollinit () {
      this.slider = new BTscroll(this.$refs.ref, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click: true,
        tap: true,
        snap: {
          threshold: 2,
          speed: 400,
          loop: true
        }
      })

      this.slider.on('scrollEnd', () => {
        this.currentIndex = this.slider.getCurrentPage().pageX
        clearTimeout(this.timer)
        this._play()
      })
    },

    // 初始化width
    contentinitwidth () {
      let contentWidth = 0
      let content = this.$refs.content
      let len = content.children
      let imgiwdth = len[0].clientWidth
      for (let i = 0; i < len.length; i++) {
        let po = len[i].clientWidth
        contentWidth += po
        len[i].style.width = imgiwdth + 'px'
      }
      contentWidth += this.$refs.ref.clientWidth * 2
      content.style.width = contentWidth + 'px'
    },

    refresh () {
      this.slider && this.slider.refresh()
    }
  },
  mounted () {
    setTimeout(() => {
      this.contentinitwidth()
      this.betterscrollinit()
      this._play()
    }, 20)
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.num{
  padding-right:20/@rem;
}
ol{
            position:absolute;
            bottom:0;
            height:60/@rem;
            width:100%;
            padding-left:20/@rem;
            background:rgba(0,0,0,.3);
            color:#fff;
            font-size:32/@rem;
            li{
                display:none;
                &.active{
                    display: block;
                }
            }
        }
</style>
