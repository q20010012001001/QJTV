<template>
    <div>
        <h5>相关推荐</h5>
        <list :tuijianlist="tuijian"></list>
        <div class="linkguanggao" @click="clickurlloc(item.url)" v-for="(item,index) in data" :key="index" >
            <img :src="item.img" alt="">
        </div>
    </div>
</template>

<script>
import {getadlink, xiangguantuijian} from '@/api/detailend.js'
import list from '@/base/list/list.vue'
export default {
  data () {
    return {
      data: [],
      tuijian: []
    }
  },
  components: {
    list
  },
  methods: {
    ajaxtuijian () {
      getadlink().then(res => {
        this.data = res.data.data
      })
    },
    ajaxtuijianguanggao () {
      xiangguantuijian().then(res => {
        this.tuijian = res.data.data
      })
    },
    clickurlloc (url) {
      location.href = url
    }
  },
  created () {
    this.ajaxtuijian()
    this.ajaxtuijianguanggao()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
h5{
    color:#f00;
    padding-left:30/@rem;
    font-size:30/@rem;
    margin-top:30/@rem;
}
.linkguanggao{
    padding:10/@rem 30/@rem;
    &:nth-of-type(1){
        padding-top:40/@rem;
    }
    img{
        width:100%
    }
}
</style>
