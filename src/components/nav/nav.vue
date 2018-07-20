<template>
<nav v-if="datanav.length">
  <router-link :to="{path:'/plus'}" tag="span" class="fr iconfont">
    <div class="list_show"></div>
    <div>&#xe618;</div>
  </router-link>
  <div class="fl">
    <naslider ref="naslider" :datanav="datanav">
      <router-link :to="{path:'/recommend',query:{id:item.id}}" :datakey="item.id" class="flex flex-align-center" tag="li"  v-for="(item,index) in datanav" :key="index">{{item.title}}</router-link>
    </naslider>
  </div>
</nav>
</template>

<script>
import {getNav} from '@/api/recommend'
import naslider from 'base/navslider/navslider.vue'
export default {
  data () {
    return {
      datanav: []
    }
  },
  methods: {

    // 获取导航数据
    navData () {
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
      })
    }

  },

  created () {
    this.navData()
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
