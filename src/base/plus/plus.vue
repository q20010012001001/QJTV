<template>
    <section class="plus">
        <div class="true">
            <div class="title">我的频道<span>点击删除频道</span></div>
            <ul>
                <li>全椒新闻</li>
            </ul>
        </div>
        <div class="flase">
            <div class="title">频道推荐<span>点击添加以下频道</span></div>
            <ul>
                <li>全椒新闻</li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      plus: state => state.plus.HEADERFOOTER
    })
  },
  mounted () {
    // console.log(this.plus)
  }
}
</script>

<style lang="less" scoped>

</style>
