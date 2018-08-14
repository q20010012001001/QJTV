<template>
    <section @keydown.enter="searchajax" class="search">
        <input type="text" v-model="vmodelVal" >
        <!-- <button @click="searchajax">卡萨丁</button> -->

        <li :key="index" v-for="(item,index) in searchlist"><h1>{{item.title}}</h1></li>
    </section>
</template>

<script>
// import {searchajax} from '@/api/search.js'
import axios from 'axios'
export default {
  data () {
    return {
      searchlist: [],
      vmodelVal: '',
      offset: 0
    }
  },
  methods: {
    searchajax () {
      // searchajax().then(res => {
      //   console.log(res)
      // })
      let url = '/getSearchList'
      axios.get(url, {
        params: {
          size: 10,
          search: this.vmodelVal,
          offset: this.offset
        }
      }).then(res => {
        this.searchlist = this.searchlist.concat(res.data)
        this.offset += res.data.length
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
