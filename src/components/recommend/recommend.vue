<template>
  <div>
    <div v-if="getcate">
      <hheader :title="title"></hheader>
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
// import {getListData} from 'api/recommend'
import loading from 'base/loading/loading.vue'
import headerHistory from 'base/headerhistroy/headerhistroy.vue'
// import {mapState} from 'vuex'
import axios from 'axios'
import oos from 'common/js/commonApi'
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
      title: '全椒广播电视台',
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
      getcate: true, // 判断是否来自点播点击去的列表页
      source: null
    }
  },
  methods: {

    cancelQuest () {
      if (typeof this.source === 'function') {
        this.source('终止请求') // 取消请求
      }
    },

    listscrollrefsh () {
      this.$refs.scroll.refresh()
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
      // 终止请求
      this.cancelQuest()

      // 判断是否替换头部导航
      this.getcatemeth()

      // 是刷新数据还是加载数据
      if (booelan) {
        this.state = true
        this.page = 1
        this.listdata = this.focus = []
      }

      // 因为点播接口page为2会重复数据,所有对点播接口做限制
      if (!booelan && this.page === 2 && this.$route.query.id === '321200') {
        this.state = false
      }

      // 数据没有的时候为false
      if (!this.state) {
        if (booelan) {
          this.$refs.scroll.finishPullDown()
        } else {
          this.$refs.scroll.finishPullUp()
        }
        return
      }

      let url = '/api/server'
      let cmd = 'getnewslist'
      let cid = this.$route.query.id
      let page = this.page
      if (!parseInt(cid)) { // 判断是推荐数据还是其他数据
        cmd = 'gethomelist'
        cid = ''
      } else if (cid === '321200') {
        cmd = 'getcate'
      } else if (cid === '33') {
        cmd = 'getlivelist'
        cid = null
      }
      let _this = this
      let dataobj = Object.assign({}, {
        cmd: cmd,
        id: cid,
        page: page
      }, oos)
      axios.get(url, {
        params: dataobj,
        cancelToken: new axios.CancelToken(function executor (c) {
          _this.source = c
        })
      }).then(data => {
        this.ajaxdatayh(booelan, data)
      }, (err) => {
        if (axios.isCancel(err)) {
          console.log('Rquest canceled', err.message) // 请求如果被取消，这里是返回取消的message
        }
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
    },

    // 获取列表数据后处理逻辑
    ajaxdatayh (booelan, data) {
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
    }
  },
  created () {
    this.getlist()
  },
  watch: {
    $route (to, from, next) {
      // 如果列表页跳列表页,重新请求数据
      if ((to.name === 'recommend' && from.name === 'recommend')) {
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
