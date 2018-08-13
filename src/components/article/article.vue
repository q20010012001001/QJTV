<template>
    <section class="article">
      <common class="artiscommmon" :data="data">
        <div class="Content Article">
          <div
           ref="content"
            class="content"
             v-html="contentfilters(data.content)"
              @click="contnetimgclick" ></div>
        </div>
      </common>
      <detailImg
        v-if="data.content"
         :imglist="data.content"
          @showishide="showishide"
           ref="detailimg" :class="{pospops:booelhide,po:true}"></detailImg>
    </section>
</template>

<script>
// import scroll from '@/base/scrll/scroll.vue'
import {articleAxios} from '@/api/detailend'
import common from '@/base/detaillist/common.vue'
import detailImg from '@/base/detaillist/detail-img.vue'

export default {
  data () {
    return {
      data: [],
      // imglist: [],
      booelhide: false,
      imgIndex: 0

    }
  },
  components: {
    common,
    detailImg
  },
  methods: {

    // v-html不能用过滤器,用方法过滤吧
    contentfilters (val) {
      if (typeof val !== 'undefined') {

      }
      return val
    },

    // 点击内容中的图片显示图册
    contnetimgclick (e) {
      let imglistarr = []
      this.data.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (a, b) => {
        imglistarr.push(b)
      })
      if (e.target.nodeName === 'IMG') {
        let url = e.target.src
        imglistarr.map((val, index) => {
          if (val === url) {
            this.$refs.detailimg.goToPage(index)
          }
        })
        this.booelhide = true
      }
    },

    articleData () {
      articleAxios(this.$route.query.id).then(res => {
        this.data = res.data.data
      })
    },
    showishide (val) {
      this.booelhide = val
    }
  },
  created () {
    this.articleData()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.pospops{
  z-index:3 !important;
  visibility: inherit !important;
}
.po{
    z-index: -1;
    visibility: hidden;
}
.artiscommmon{
  z-index:2;
  background:#fff;
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
