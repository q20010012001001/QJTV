<template>
    <section class="search">
1111
    </section>
</template>

<script>
import {searchajax} from '@/api/search.js'
export default {
  methods: {
    searchajax () {
      searchajax().then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.searchajax()
  }
}
</script>

<style lang="less" scoped>

</style>
