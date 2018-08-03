<template>
    <section class="article">
      <common :data="data">
        <div class="Content Article">
          <div class="content" v-html="data.content" ></div>
        </div>
      </common>
    </section>
</template>

<script>
// import scroll from '@/base/scrll/scroll.vue'
import {articleAxios} from '@/api/detailend'
import common from '@/base/detaillist/common.vue'

export default {
  data () {
    return {
      data: []
    }
  },
  components: {
    common
  },
  methods: {
    articleData () {
      articleAxios(this.$route.query.id).then(res => {
        this.data = res.data.data
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
.article{
    width:100%;
    max-width:100%;
    img{
            width:100%;
display:inline-block
    }
}
.content img{
}
img{
  width:100%;
}
.Content{
  padding:0 30/@rem;
  margin-top:20/@rem;
}
</style>
<style lang="less">
.Article{
  .content{
  img{
        width: 100%;
    height: auto;
    display: block;
        max-width: 100%;
  }
  span,p,div,header,article{
        font-size: 0.5rem !important;
    line-height: 1.5em !important;
  }
  }
}
</style>
