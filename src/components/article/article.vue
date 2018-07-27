<template>
    <section class="article">
        <div class="header">
            <span class="history">返回</span>
        </div>
        <h1>{{data.title}}</h1>
        <div class="content" v-html="data.content" ></div>
        <!-- <scroll>

        </scroll> -->
    </section>
</template>

<script>
// import scroll from '@/base/scrll/scroll.vue'
import {articleAxios} from '@/api/detailend'
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    articleData () {
      articleAxios(this.$route.query.id).then(res => {
        this.data = res.data.data
        // console.log(res.data.data)
      })
    }
  },
  created () {
    this.articleData()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.header{
    height:88/@rem;
    background:#ccc;
}
.article{
    width:100%;
    max-width:100%;
    img{
            width:100%;
display:inline-block
    }
}
.content img{
    width:100%;
display:inline-block
}
</style>
