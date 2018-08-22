<template>
    <section @keydown.enter="searchajax(true)" class="search">

      <!-- 头部 -->
      <hheader :title="title"></hheader>

      <!-- 搜索框 -->
      <div class="searchinput flex">
        <input
         v-focus
          ref="ipt"
           type="text"
            class="flex-1"
             v-model="vmodelVal" >
        <div class="btn flex flex-align-center">
          <span @click="searchajax(true)" class="suc">确定</span>
          <span @click="back" class="deg">取消</span>
        </div>
      </div>
        <!-- <button @click="searchajax">卡萨丁</button> -->

      <scroll
       ref="scroll"
       class="scroll"
        @scrollpos="scrollpos"
         :pullUpLoad="pullUpLoad"
          :pullDownRefresh="pullDownRefresh"
           :probeType="probeType"
            @pullingUp="pullingUp"
             @pullingDown="pullingDown">
        <listtwo :tuijianlist="searchlist"></listtwo>
        <loading v-show="k" :state="state"></loading>
      </scroll>
    </section>
</template>

<script>
import hheader from 'base/header/header'
import listtwo from '@/base/list/list2.vue'
import scroll from '@/base/scroll/scroll.vue'
import axios from 'axios'
import loading from 'base/loading/loading.vue'
export default {
  data () {
    return {
      searchlist: [],
      vmodelVal: '',
      offset: 0,
      title: '搜索',
      scrollY: 0,
      probeType: 3,
      pullDownRefresh: {
        threshold: 50,
        stop: 0
      },
      pullUpLoad: {
        threshold: 200
      },
      state: true,
      routername: '', // 判断是从哪个路由进来的
      k: false
    }
  },
  components: {
    hheader,
    scroll,
    listtwo,
    loading
  },
  directives: {
    // 让input进入页面自动获取焦点
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {

    // 处理pc搜索接口的图片
    filterImg (imgarr) {
      let arr = []
      if (imgarr.length) {
        imgarr.map((val, index) => {
          if (val) {
            arr.push({
              img: val
            })
          }
        })
      } else {
        arr.push({})
      }
      return arr
    },

    // 截取url参数取出?号值
    urlSplice (url, name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = url.substr(1).match(reg)
      if (r != null) return unescape(r[2]); return null
    },

    // 处理pc接口的id
    // 把/audio.do?cid=10120&resid=7f71e80d处理为7f71e80d
    // (id的3种情况 [{
    //   vid:视频,
    //   aid:图集.图文,
    //   resid:音乐
    // }])
    filterid (id) {
      let split = `?${id.split('?')[1]}`
      let idouth = ['vid', 'aid', 'resid']
      let filterid = ''
      idouth.map((val) => {
        if (this.urlSplice(split, val)) {
          filterid = this.urlSplice(split, val)
        }
      })
      return filterid
    },

    // 因PC接口与app接口字段不一样,处理为一样的数据
    filteData (data) {
      let ms = data.map((val) => {
        return {
          date: val.time,
          id: this.filterid(val.link),
          type: val.restype,
          imgs: this.filterImg(val.images),
          title: val.title,
          uid: val.userid,
          userlogo: val.userlogo,
          view: val.hit
        }
      })
      return ms
    },

    // 取消按钮返回上一页
    back () {
      this.$router.back()
    },

    // 获取搜索数据
    searchajax (booelan) {
      // 没有输入东西不让搜索
      if (!this.vmodelVal) return

      // 是刷新数据还是加载数据
      if (booelan) {
        this.offset = 0
        this.state = true
        this.searchlist = []
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

      let url = '/getSearchList'

      // 让loading在第一次进入时隐藏
      this.k = true

      axios.get(url, {
        params: {
          size: 10,
          search: this.vmodelVal,
          offset: this.offset
        }
      }).then(res => {
        // 因接口字段不一样,需要处理
        let resData = this.filteData(res.data)

        this.ajaxdatayh(booelan, resData)
      })
    },

    // 获取列表数据后处理逻辑
    ajaxdatayh (booelan, data) {
      if (data.length < 10) {
        this.state = false
      }

      this.searchlist = this.searchlist.concat(data)
      this.offset += data.length
      this.$nextTick(() => {
        if (booelan) {
          this.$refs.scroll.finishPullDown()
        } else {
          this.$refs.scroll.finishPullUp()
        }
        this.$refs.scroll.refresh()
      })
    },

    // 上拉加载
    pullingUp () {
      this.searchajax()
    },

    // 下拉刷新
    pullingDown () {
      this.searchajax(true)
    },

    // 监听better-scroll滚动条位置
    scrollpos (pos) {
      this.scrollY = pos.y
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'video' || from.name === 'audio' || from.name === 'album' || from.name === 'article') {
      next(vm => {
        vm.routername = from.query.id // 记录是从哪里进入搜索页面
        vm.$refs.scroll.refresh()
        vm.$refs.scroll.scrollTo(0, vm.scrollY)
      })
    } else {
      next(vm => {
        vm.routername = from.query.id // 记录是从哪里进入搜索页面
        vm.$refs.scroll.scrollTo(0, 0)
        vm.searchajax(true)
      })
    }
  },
  beforeRouteLeave (to, from, next) { // 解决点击logo跳转推荐不更新数据的问题
    if (to.query.id !== this.routername && parseInt(to.query.id) === 0) {
      to.meta.booelreferch = true
      next()
    } else {
      next()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.scroll{
  position:fixed;
  top:180/@rem;
  bottom:0;
  left:0;
  right:0;
  width:100%;
  overflow:hidden
}
  .searchinput{
    height:100/@rem;
    box-sizing: border-box;
    padding:20/@rem 30/@rem;
        background: #f4f5f6;
        input{
              outline: none;
              margin-right:20/@rem;
    border: 0;
        padding-left: 16/@rem;
            height: 60/@rem;
                border-radius: 16/@rem;
                background: #ffffff;
        }
        span{
              color: #3696d9;
                  font-size:24/@rem;
                      background: #f4f5f6;
                          cursor: pointer;
                          margin-left:24/@rem;
        }
  }
</style>
