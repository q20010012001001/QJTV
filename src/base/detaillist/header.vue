<template>
    <div>
        <headerhistory :headertext="headertext"></headerhistory>
        <div class="title">
            <h1>{{data.title}}</h1>
        </div>
        <div class="touxiangguanzhu flex flex-align-center flex-pack-justify">
            <div @click="userrouter" class="touxiang flex flex-align-center">
                <touxiangimg :img="userdataa.img"></touxiangimg>
                <div class="flex flex-v">
                    <span class="">{{data.from}}</span>
                    <span>{{data.time | timefil}}</span>
                </div>
            </div>
            <div class="guanzhu" v-if="userdataa&&data">
               关注
            </div>
        </div>
    </div>
</template>

<script>
import {userdetailAxios} from '@/api/user.js'
import touxiangimg from '@/base/detail-touxiang/detail-touxiang.vue'
import headerhistory from '@/base/headerhistroy/headerhistroy.vue'
export default {
  props: ['data'],
  components: {
    headerhistory,
    touxiangimg
  },
  data () {
    return {
      headertext: '',
      userdataa: {}
    }
  },
  filters: {
    timefil (aa) {
      if (aa) {
        return aa.split(' ')[0]
      } else {
        return ''
      }
    }
  },
  methods: {
    userrouter () {
      this.$router.push({
        name: 'userlist',
        query: {
          uid: this.$route.query.uid
        }
      })
    },

    userdata () {
      let name = this.$route.name
      if (name === 'article') {
        this.headertext = '正在阅读'
      } else if (name === 'video' || name === 'audio') {
        this.headertext = '正在观看'
      }
      userdetailAxios(this.$route.query.uid).then(res => {
        this.userdataa = res.data.data
      })
    }
  },
  created () {
    this.userdata()
  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.touxiangguanzhu{
    padding:10/@rem 30/@rem;
.touxiang{

    color:#222121;
font-size:24/@rem;
    img{

    }
}
}
.guanzhu{
    width:126/@rem;
    display:inline-block;
    color:#fff;
    background:#088DE7;
    border-radius:10/@rem;
    text-align: center;
    font-size:26/@rem;
    padding:14/@rem 0;
}

h1{
    font-size:52/@rem;
    margin-top: 20/@rem;
    padding:20/@rem 30/@rem;
    padding-top:10/@rem;
}
</style>
