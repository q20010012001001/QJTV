<template>
    <div>
        <loadingvue v-show="!showfalse"></loadingvue>
        <div v-show="showfalse">
          <headerdetail ref="header" :data="data"></headerdetail>
          <slot></slot>
          <tuijian ref="tuijian"></tuijian>
        </div>
    </div>
</template>

<script>
import loadingvue from '@/base/loading/loading.vue'
import headerdetail from '@/base/detaillist/header.vue'
import tuijian from '@/base/detaillist/tuijian.vue'
export default {
  name: 'common',
  props: ['data'],
  data () {
    return {
      showfalse: false
    }
  },
  components: {
    loadingvue,
    headerdetail,
    tuijian
  },
  methods: {
    nextrick () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.showfalse = true
          this.$emit('detailJS')
        }, 500)
      })
    }
  },
  watch: {
    data () {
      this.nextrick()
    },
    $route () {
      document.body.scrollTop = 0
      this.showfalse = false
      this.nextrick()
      this.$refs.header.userdata()
      this.$refs.tuijian.ajaxtuijian()
      this.$refs.tuijian.ajaxtuijianguanggao()
    }
  }
}
</script>

<style>

</style>
