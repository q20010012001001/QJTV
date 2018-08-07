<template>
    <section class="album">
        <h1>{{data.title}}</h1>
        <div>
            <ul>
                <li v-for="(item,index) in data.photos" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{item.tile}}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {albumAxios} from '@/api/detailend'
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    articleData () {
      albumAxios(this.$route.query.id).then(res => {
        this.data = res.data.data
        console.log('提交了去' + res.data.data)
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
.album{
  width:100%;
  height:100%;
  background:#000;
  overflow:hidden;
  position:fixed;
  top:0;
  left:0;
}
img{
    max-width:100%;
    width:100%;
}
</style>
