<template>
<nav v-if="datanav.default.length">
  <router-link :to="{path:'/plus'}" tag="span" class="fr iconfont">
    <div class="list_show"></div>
    <div>&#xe618;</div>
  </router-link>
  <div class="fl">
    <naslider ref="naslider" :datanav="datanav.default">
      <router-link :to="{path:'/recommend',query:{id:item.id}}" :datakey="item.id" class="flex flex-align-center" tag="li"  v-for="(item,index) in datanav.default" :key="index">{{item.title}}</router-link>
    </naslider>
  </div>
</nav>
</template>

<script>
import {getNav} from '@/api/recommend'
import naslider from 'base/navslider/navslider.vue'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      datanav: {
        default: [],
        other: []
      }
    }
  },
  methods: {

    ...mapMutations({
      navsinger: 'NAVDATA'
    }),

    // 获取导航数据
    navData () {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('vuex')) {
          let vuexdata = JSON.parse(localStorage.getItem('vuex'))
          this.datanav = vuexdata.navdata
          this.navsinger(vuexdata.navdata)
          resolve(this.datanav)
        } else {
          getNav().then(data => {
            this.datanav = data.data.default.concat(data.data.other)

            // 处理导航数据中的推荐与直播
            this.datanav.forEach((val, index) => {
              let id = val.id
              if (!id) {
                if (val.title === '推荐') {
                  val.id = 0
                } else if (val.title === '直播') {
                  val.id = 33
                }
              }
            })

            // 处理导航数据分为默认与其他
            let dataobj = {
              default: [],
              other: []
            }
            this.datanav.map((val, index) => {
              if (index <= 6) {
                dataobj.default.push(val)
              } else {
                dataobj.other.push(val)
              }
            })
            this.datanav = dataobj

            this.navsinger(this.datanav)
            resolve(this.datanav)
          })
        }
      })
    }

  },
  watch: {
    // 判断是否是从plus页面过来,是的话更新导航
    $route (to, from, next) {
      if (from.name === 'plus') {
        this.$refs.naslider.clientUlWIDTH()
        this.$refs.naslider._indexnav()

        let msindex = this.$refs.naslider._navinitoffset()

        // 解决去掉目前在看的导航时前往推荐
        if (msindex === 0 && this.$route.query.id !== '0') {
          let booelsi = this.datanav.default.filter((val) => {
            return val.id === this.$route.query.id
          })
          if (!booelsi.length) {
            this.$router.push({
              path: '/recommend?id=0'
            })
          }
        }
      }
    }
  },

  created () {
    this.navData().then((res) => {
      this.$nextTick(() => {
        let ki = this.datanav.default.filter(val => {
          return this.$route.query.id === val.id
        })
        if (!ki.length) {
          this.datanav.other.map((val, index) => {
            if (val.id === this.$route.query.id) {
              let psice = this.datanav.other.splice(index, 1)
              this.datanav.default.push(psice[0])
            }
          })
        }
      })
    })
  },
  components: {
    naslider
  }
}
</script>
<style lang="less" scoped>
@import '~common/less/common.less';
.list_show{
      background: url('download.png') no-repeat center right;
          width: 20/@rem;
    height: 100%;
    background-size: contain;
    position:absolute;
   background-color: rgba(244, 245, 246, 0.3);
   left:-20/@rem;
}
li{
  font-size:32/@rem;
  height:70/@rem;
  padding-left:30/@rem;
  white-space: nowrap;
  color:#6e6e6e;
  &.router-link-exact-active{
    color:#f00;
  }
  &:last-child{
    padding-right:15/@rem;
  }
}
nav{
  width:100%;
  overflow:hidden;
  position:relative;
  .fl{
    // margin-right:52/@rem;
  // width:675/@rem;
  // float: left;
      overflow: hidden;
  }
  .fr{
    position:relative;
    &.iconfont{
      font-size:50/@rem;
    }
    float:right;
    height:70/@rem;
    width:60/@rem;
    line-height:70/@rem;
    text-align: center;
    background: #ffffff;
    img{
      position:absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      margin:auto;
    }
  }
}
</style>
