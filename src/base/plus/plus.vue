<template>
    <section v-if="navdata.default" class="plus">
        <span @click="removeclick" class="remove"><img src="./sum_cha.png" alt=""></span>
        <div class="true">
            <div class="title">我的频道<span>点击删除频道</span></div>
            <ul class="clearfix">
                <li @click.prevent.stop="liclick(0,index)" :key="index" v-for="(item,index) in navdata.default" class="omit border-box">{{item.title}}</li>
            </ul>
        </div>
        <div class="flase">
            <div class="title">频道推荐<span>点击添加以下频道</span></div>
            <ul>
                <li @click.prevent.stop="liclick(1,index)" :key="index" v-for="(item,index) in navdata.other" class="omit border-box">{{item.title}}</li>
            </ul>
        </div>
    </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  computed: {
    // ...mapState({
    //   plus: state => state.plus.HEADERFOOTER
    // })
    ...mapState({
      navdata: state => {
        return state.navdata
      }
    })
  },
  mounted () {
  },
  methods: {
    ...mapMutations({
      merthodskk: 'NAVDATA'
    }),
    removeclick () {
      this.$router.go(-1)
    },

    // 点击添加与删除
    liclick (num, index) {
      // 防止推荐与点播被换到下方
      if (!num && (index === 0 || index === 1)) {
        return
      }
      if (num) {
        let op = this.navdata.other.splice(index, 1)
        this.navdata.default.push(op[0])
      } else {
        let op = this.navdata.default.splice(index, 1)
        this.navdata.other.push(op[0])
      }
      this.merthodskk(this.navdata)
    }

  }
}
</script>

<style lang="less" scoped>
@import '~common/less/common.less';
.remove{
    position:absolute;
    right:30/@rem;
    top:30/@rem;
    width:30/@rem;
    img{
        width:100%;
        display:block;
    }
}
.true{
    margin-top:80/@rem;
    ul li{
        &:nth-of-type(1),&:nth-of-type(2){
            background:#f0f0f0;
        }
    }
}
ul{
            flex-wrap: wrap;
    }
    ul li{
        text-align: center;
        margin-right:2%;
        &:nth-of-type(4n+0){
            margin-right:0
        }
        width:23%;
        float: left;
        background: #fff;
        color:#000;
        font-size:30/@rem;
        margin-bottom:20/@rem;
        padding:14/@rem 10/@rem;
    }
.true,.false{
    margin-bottom:40/@rem;

}
    .plus{
        .bodymax();
        width:100%;
        height:100%;
        background:#f4f5f6;
        padding:0 30/@rem;
        box-sizing: border-box;
        position:fixed;
        top:0;
        overflow-y:scroll;
    }
    .title{
        font-size:33/@rem;
        margin-bottom:40/@rem;

        color:#000;
        font-weight:bold;
        span{
            color:#a0a0a0;
            font-size:24/@rem;
            font-weight:normal;
            margin-left:22/@rem;
        }
    }
</style>
