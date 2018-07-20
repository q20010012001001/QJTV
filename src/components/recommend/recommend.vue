<template>
    <scroll ref="scroll" class="content border-box">

      <div>
        <loading v-if="!tuijianlist.length" ref="loading"></loading>

        <!-- 轮播图 -->
        <hbanner v-if="!parseInt($route.query.id)"></hbanner>

        <!-- 列表页 -->
        <hlist :tuijianlist="tuijianlist"></hlist>

      </div>

    </scroll>

</template>

<script>

import hbanner from 'components/banner/banner'
import hlist from 'base/list/list'
import scroll from 'base/scroll/scroll'
import {getListData} from 'api/recommend'
import loading from 'base/loading/loading.vue'
export default {
  components: {
    loading,
    hbanner,
    scroll,
    hlist
  },
  data () {
    return {
      tuijianlist: []

    }
  },
  methods: {
    getlist () {
      // 判断是否有缓存数据
      let sessiondata = sessionStorage.getItem('listdata')
      if (!sessiondata) {
        let obj = {}
        sessionStorage.setItem('listdata', JSON.stringify(obj))
        sessiondata = sessionStorage.getItem('listdata')
      }
      // let pos = JSON.parse(sessiondata)

      // 是否有新闻栏目id,有的话直接取数据,没的话调取数据
      // for (let i in pos) {

      // }
      // if (pos.queryid.items.includes(this.$route.query.id)) {
      //   // 取数据
      // } else {
      //   // 调取新数据并存入
      // }

      this.tuijianlist = []
      getListData(this.$route.query.id).then(data => {
        this.tuijianlist = data.data.data
        this.$nextTick(() => {
          this.$refs.scroll.scrollTo(0, 0)
        })
      })
    }
  },
  created () {
    this.getlist()
  },
  watch: {
    $route () {
      this.getlist()
    }
  }

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
}
body,html{
  height:100%;
}
</style>
