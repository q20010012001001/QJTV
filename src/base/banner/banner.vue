<template>
    <section class="banner" ref="banner">
        <div  v-if="bannerfocus.length">
          <bannerslider ref="bannerslider" :data="bannerfocus">
            <li v-for="(item,index) in bannerfocus" :key="index">
                <a :href="item.url">
                    <div class="img"><img @load="loadImage" :src="item.img" alt=""></div>
                    <!-- <div class="title flex flex-align-center border-box">{{item.title}}</div> -->
                </a>
            </li>
          </bannerslider>
          <loading></loading>
        </div>
    </section>
</template>

<script>
import bannerslider from 'base/bannerslider/bannerslider.vue'
import loading from '@/base/loading/loading.vue'

export default {
  data () {
    return {
      checkloaded: false
    }
  },
  props: {
    bannerfocus: {
      type: Array,
      default: Array
    }
  },
  components: {
    bannerslider,
    loading
  },
  methods: {
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.bannerslider.refresh()
      }
    }
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
