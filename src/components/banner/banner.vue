<template>
    <section v-if="bannerdata.length" class="banner" ref="banner">
        <bannerslider ref="bannerslider" :data="bannerdata">
            <li v-for="(item,index) in bannerdata" :key="index">
                <a :href="item.url">
                    <div class="img"><img @load="loadImage" :src="item.img" alt=""></div>
                    <!-- <div class="title flex flex-align-center border-box">{{item.title}}</div> -->
                </a>
            </li>
        </bannerslider>
        <loading></loading>
    </section>
</template>

<script>
import bannerslider from 'base/bannerslider/bannerslider.vue'
import {getListData} from 'api/recommend'
import loading from '@/base/loading/loading.vue'

export default {
  data () {
    return {
      bannerdata: [],
      checkloaded: false
    }
  },
  components: {
    bannerslider,
    loading
  },

  methods: {
    getListBanner () {
      getListData().then(data => {
        this.bannerdata = data.data.focus
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.bannerslider.refresh()
      }
    }
  },
  created () {
    this.getListBanner()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.banner{
    width:100%;
    overflow:hidden;
    height:4.9rem;
    position:relative;

    li{

        float: left;
        width:100%;
    img{
        width:100%;
        display: block;
        height:4.9rem;
    }
    }
}
</style>
