<template>
    <section class="userlist">

      <!-- 头部 -->
      <div class="headercomms">
      <headerhistory :headertext="`${userdetail.username}的个人主页`"></headerhistory>
      </div>

      <div>
      <scroll
       @scrollpos="scrollpos"
        class="posscroll"
         :probeType="probeType"
          ref="scroll"
           @pullingUp="pullingUp"
            :pullUpLoad="pullUpLoad">

      <!-- 头像背景头像 -->
      <div class="backgroundurl flex flex-v flex-align-center" :style="{backgroundImage:'url('+(userdetail.bgimg?userdetail.bgimg:banseimg)+')'}">}
        <div class="touxiang flex flex-pack-center">
          <div><img :src="userdetail.img" alt=""></div>
        </div>
        <div class="text flex flex-v flex-pack-center">
          <div class="colorf00">
            <span>{{userdetail.username}}</span>
            <span>关注</span>
          </div>
          <div class="colorfff">{{userdetail.desc}}</div>
        </div>
      </div>

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
export default {
  methods: {
    pullingUp () {
      this.userlistData()
    },
    scrollpos (pos) {
      this.scrollY = pos.y
    },

    // 作者发布的新闻列表
    userlistData () {
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
      state: true
    }
  },
  created () {
    this.userlistData()
    this.userdetailData()
  },
  components: {
    listtwo,
    headerhistory,
    scroll,
    loading
  },
  watch: {
    $route (to, form, next) {
      // this.page = 1
      // this.userlistData()
      // this.userdetailData()
      // this.$refs.scroll.scrollTo(0, 0)
      // if (to.name === 'userlist' && form.name === 'article') {
      //   console.log(1111)
      // }
      // if (to.name === 'userlist' && (form.name === 'article' || form.name === 'video' || form.name === 'audio' || form.name === 'album')) {
      //   this.$refs.scroll.refresh()
      //   this.$refs.scroll.scrollTo(0, this.scrollY)
      // } else {
      //   this.$refs.scroll.scrollTo(0, 0)
      // }
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.posscroll{
  position:fixed;
  overflow: hidden;
  bottom:0;
  top:80/@rem;
  width:100%;
}
.headercomms{
  position:fixed;
  top:0;
  width:100%;
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
  background-size:cover;
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
