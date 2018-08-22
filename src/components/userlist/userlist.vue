<template>
    <section class="userlist">

      <!-- 头部 -->
      <div class="headercomms">
      <headerhistory :headertext="`${userdetail.username}的个人主页`"></headerhistory>
      </div>

      <div class="usercontnet100">

      <!-- 头像背景头像 -->
      <div ref="bgurlimg" class="backgroundurl flex flex-v flex-align-center" :style="{backgroundImage:'url('+(userdetail.bgimg?userdetail.bgimg:banseimg)+')'}">}
        <div class="touxiang flex flex-pack-center">
          <div><img :src="userdetail.img" alt=""></div>
        </div>
        <div class="text flex flex-v flex-pack-center">
          <div class="colorf00 flex">
            <span>{{userdetail.username}}</span>
            <span @click="downloadclick" class="lol flex flex-align-center"><img src="./attention.png" alt=""></span>
          </div>
          <div class="colorfff">{{userdetail.desc}}</div>
        </div>
      </div>

      <div ref="layer" class="layer"></div>

<scroll
       @scrollpos="scrollpos"
        class="posscroll"
         :probeType="probeType"
          ref="scroll"
           @pullingUp="pullingUp"
            :pullUpLoad="pullUpLoad">
      <div class="scrolldiv">

        <!-- 它的发布标题 -->
        <div class="listtitletilsm flex flex-align-center">
          <span class="flex flex-align-center">TA的发布</span>
        </div>

        <!-- 列表 -->
        <listtwo :tuijianlist="userlist"></listtwo>
        <loading :state="state"></loading>
      </div>

      </scroll>

      </div>

    </section>
</template>

<script>
import {userlistAxios, userdetailAxios} from '@/api/user.js'
import headerhistory from '@/base/headerhistroy/headerhistroy.vue'
import scroll from '@/base/scroll/scroll.vue'
import listtwo from '@/base/list/list2.vue'
import loading from 'base/loading/loading.vue'
import {prefixStyle} from '@/common/js/dom.js'
import {download} from '@/api/downLoad.js'

const transform = prefixStyle('transform')
export default {
  methods: {
    downloadclick () {
      download()
    },

    pullingUp () {
      this.userlistData()
    },
    scrollpos (pos) {
      this.scrollY = pos.y
    },

    // 作者发布的新闻列表
    userlistData (page) {
      if (page) { // 重新请求数据
        this.page = 1
        this.userlist = []
        this.userdetail = {}
        this.scrollY = 0
        this.state = true
        this.openkey = false
      }
      if (this.openkey || !this.state) { return }
      this.openkey = true
      userlistAxios(this.$route.query.uid, this.page).then(res => {
        if (res.data.data.length < 20) {
          this.state = false
        }
        this.userlist = this.userlist.concat(res.data.data)
        this.page++
        this.$nextTick(() => {
          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.refresh()
          this.openkey = false
        })
      })
    },

    // 作者的详情信息
    userdetailData () {
      userdetailAxios(this.$route.query.uid).then(res => {
        this.userdetail = res.data.data
      })
    }

  },
  data () {
    return {
      banseimg: require('./banner1.jpg'),
      openkey: false,
      userlist: [],
      userdetail: {},
      scrollY: 0,
      probeType: 3,
      pullUpLoad: {
        threshold: 200
      },
      page: 1,
      state: true,
      uid: false // 用于记录用户uid
    }
  },
  mounted () {
    this.bgimgClientHeight = this.$refs.bgurlimg.clientHeight
  },
  components: {
    listtwo,
    headerhistory,
    scroll,
    loading
  },
  watch: {
    scrollY (pos) {
      let scale = 1
      let filterpos = Math.max(-this.bgimgClientHeight, pos)
      let percent = Math.abs(pos / this.bgimgClientHeight)
      if (pos > 0) {
        scale = 1 + percent
      }
      this.$refs.layer.style[transform] = `translate(0,${filterpos}px)`
      this.$refs.bgurlimg.style[transform] = `scale(${scale})`
    }
  },
  activated () {
    let queryuid = parseInt(this.$route.query.uid)
    if (this.uid !== queryuid) {
      this.uid = queryuid
      this.userlistData(true)
      this.userdetailData()
    } else {
      this.uid = queryuid
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.scrollY)
    }
  }

}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.usercontnet100{
  height:100%;
}
.userlist{
  height:100%;
  overflow:hidden;
}
.layer{
  position:relative;
  background:#fff;
  height:100%;
}
.lol{
  margin-left:10/@rem;
  img{
    width:140/@rem;
  }
}
.posscroll{
  position:fixed;
  // overflow: hidden;
  bottom:0;
  top:430/@rem;
  width:100%;
}
.headercomms{
  position:fixed;
  top:0;
  width:100%;
  z-index:999;
}
.listtitletilsm{
  height:80/@rem;
  border-bottom:1/@rem solid #ccc;
  font-size:32/@rem;
  span{
    padding:0 40/@rem;
     border-bottom:5/@rem solid #dd3635;
     line-height:80/@rem;
     height:80/@rem;
     display:inline-block;
     color:#dd3635;
  }
}
.backgroundurl{
  background-repeat: no-repeat;
  height:350/@rem;
  margin-top:80/@rem;
  background-size:cover;
      transform-origin: top;
}
.text {
  text-align: center;
  font-size:24/@rem;
}
.colorfff{
  color:#fff;
      text-shadow: 1/@rem 2/@rem 0px #000;
}
.colorf00{
  color:#dd3635;
  font-weight:bold;
      text-shadow: 0px 1/@rem 0px #fff;
      font-size:36/@rem;
      padding-bottom:10/@rem;
      padding-top:10/@rem;
}
.touxiang{
  margin-top: 20/@rem;
  div{

  }
}
.touxiang img{
  width:150/@rem;
  height:150/@rem;
  border-radius: 50%;
  padding:5/@rem;
    background:#fff;
}
.text div{
  // margin-top:10/@rem;
}
</style>
