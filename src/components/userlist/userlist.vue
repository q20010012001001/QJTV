<template>
    <section class="userlist">
        <img :src="userdetail.img" alt="">
        <img :src="userdetail.bgimg" alt="">
        <span>{{userdetail.username}}</span>
        <ul>
            <li v-for="(item,index) in userlist" :key="index">
                <h5>{{item.title}}</h5>
            </li>
        </ul>
    </section>
</template>

<script>
import {userlistAxios, userdetailAxios} from '@/api/user.js'
export default {
  methods: {
    userlistData () {
      userlistAxios(this.$route.query.uid).then(res => {
        this.userlist = res.data.data
      })
    },
    userdetailData () {
      userdetailAxios(this.$route.query.uid).then(res => {
        this.userdetail = res.data.data
      })
    }

  },
  data () {
    return {
      userlist: [],
      userdetail: {}
    }
  },
  created () {
    this.userlistData()
    this.userdetailData()
  }
}
</script>

<style>

</style>
