<template>
  <div>
    <div v-if="getcate">
      <hheader @serachclick="serachclick"></hheader>
      <hnav></hnav>
    </div>
    <div v-else>
        <header-history :headertext="$route.query.title"></header-history>
      </div>

    <scroll
     ref="scroll"
      @scrollpos="scrollpos"
       class="content border-box"
        :pullUpLoad="pullUpLoad"
         :pullDownRefresh="pullDownRefresh"
          :probeType="probeType"
           @pullingUp="pullingUp"
            @pullingDown="pullingDown" :class="{getcate:!getcate}" >

      <div>

        <!-- 轮播图 -->
        <hbanner :bannerfocus="focus" v-if="!parseInt($route.query.id)"></hbanner>

        <!-- 列表页 -->
        <getcate v-if="$route.query.id ==='321200'" :getcatelist="listdata"></getcate>
        <hlist v-else @listscrollrefsh="listscrollrefsh" :tuijianlist="listdata"></hlist>

        <loading :state="state"></loading>
      </div>

    </scroll>
  </div>
</template>

<script>
import hheader from 'base/header/header'
import hnav from 'base/nav/nav'
import hbanner from 'base/banner/banner'
import hlist from 'base/list/list'
import getcate from 'base/getcate/getcate'
import scroll from 'base/scroll/scroll'
import {getListData} from 'api/recommend'
import loading from 'base/loading/loading.vue'
import headerHistory from 'base/headerhistroy/headerhistroy.vue'
// import {mapState} from 'vuex'
export default {
  components: {
    loading,
    hbanner,
    scroll,
    hlist,
    hheader,
    hnav,
    getcate,
    headerHistory
  },
  data () {
    return {
      page: 1,
      scrollY: 0,
      probeType: 3,
      pullDownRefresh: {
        threshold: 50,
        stop: 0
      },
      pullUpLoad: {
        threshold: 200
      },
      listdata: [],
      focus: [],
      state: true,
      currentDeffer: false,
      getcate: true // 判断是否来自点播点击去的列表页
    }
  },
  methods: {

    listscrollrefsh () {
      this.$refs.scroll.refresh()
    },

    // search按钮点击
    serachclick () {
      this.$router.push({
        name: 'search'
      })
    },

    // 下拉刷新
    pullingDown () {
      this.getlist(true)
    },

    // 上拉加载
    pullingUp () {
      this.getlist()
    },

    // 加载数据或刷新数据 true为刷新数据,不传或false为加载数据
    getlist (booelan) {
      this.getcatemeth() // 判断是否替换头部导航
      if (booelan) { // 是刷新数据还是加载数据
        this.state = true
        this.page = 1
        this.listdata = this.focus = []
      }
      if (!booelan && this.page === 2 && this.$route.query.id === '321200') { // 因为点播接口page为2会重复数据,所有对点播接口做限制
        this.state = false
      }
      if (!this.state) { // 数据没有的时候为false
        if (booelan) {
          this.$refs.scroll.finishPullDown()
        } else {
          this.$refs.scroll.finishPullUp()
        }
        return
      }
      getListData({
        id: this.$route.query.id,
        page: this.page
      }).then(data => {
        setTimeout(() => {
          let res = data.data
          if (res.data.length < 20) {
            this.state = false
          }

          if (res.focus) {
            this.focus = res.focus
          }
          this.listdata = this.listdata.concat(res.data)
          this.page++
          this.$nextTick(() => {
            if (booelan) {
              this.$refs.scroll.finishPullDown()
            } else {
              this.$refs.scroll.finishPullUp()
            }
            this.$refs.scroll.refresh()
          })
        }, 200)
      })
    },
    scrollpos (pos) {
      this.scrollY = pos.y
    },

    // 判断是否是点播,进而隐藏头部
    getcatemeth () {
      if (this.$route.query.from) {
        this.getcate = false
      } else {
        this.getcate = true
      }
    }
  },
  created () {
    this.getlist()
  },
  watch: {
    $route (to, from, next) {
      // 如果列表页跳列表页,重新请求数据
      if (to.name === 'recommend' && from.name === 'recommend') {
        this.$refs.scroll.scrollTo(0, 0)
        this.getlist(true)
      } else if (from.name !== 'recommend') {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.scrollY)
      }
    }
  }
  // beforeRouteUpdate (to, from, next) {
  // 如果导航有getcate说明来自点播替换头部
  // if (from.name === 'recommend' && this.$route.query.from === 'getcate') {
  //   this.getcate = false
  //   next()
  // } else {
  //   next()
  // }
  // }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';

.content{
  // height:100%;
  position:fixed;
  overflow:hidden;
  top:150/@rem;
  width:100%;
  bottom:0;
  &.getcate{
    top:80/@rem;
  }
}
body,html{
  height:100%;
}
</style>
