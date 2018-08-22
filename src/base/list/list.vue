<template>
        <!-- 推荐数据 -->
        <div class="list">
          <li
           @touchstart="touchstartcloclr(index)"
            :class="{
              active:sessionlist.includes(item.id),
              hoverbg:item.color
              }"
             v-for="(item,index) in tuijianlist"
              :key="index"
               @touchend="touchendcloclr(index)">

            <!-- 二张图 -->
                        <div v-if="index%3==0&&index!=0&&item.type==0" class="twoImage">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="twoimg flex-pack-justify flex">
                  <div class="flex-1">
                      <img v-if="isdetailBollean" :src="item.arrimg[0]" alt="">
                      <img v-if="!isdetailBollean" v-lazy="item.arrimg[0]" alt="">
                  </div>
                  <div class="flex-1">
                    <img v-if="isdetailBollean" :src="item.arrimg[1]" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.arrimg[1]" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
                <div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

          <!-- 没图 -->
          <div v-else-if="(item.type == 1 && item.img.match(/default.png/))" class="noImage">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
<div class="pro flex flex-align-center">
                  <span v-if="item.authorLogo || item.authorName" @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
          </div>

          <!-- 大图 -->
          <div class="pongge" v-else-if="index%7==0&&index!=0&&item.type==0">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div @click="linkrouter(item)" class="pongeImg flex">
                    <img v-if="isdetailBollean" class="flex-1" :src="item.arrimg[0]" alt="">
                    <img v-if="!isdetailBollean" class="flex-1" v-lazy="item.arrimg[0]" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
          </div>

<!-- 三张图 -->
            <div class="treeImage" v-else-if="(index%5==0&&index!=0&&item.type==0) || (item.type==1&&item.img2&&item.img3) || (item.type==2&&item.img2&&item.img3)">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div v-if="item.type == 0" class="treeimg flex-pack-justify flex">
                  <div>
                    <img v-if="isdetailBollean" :src="item.arrimg[0]" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.arrimg[0]" alt="">
                  </div>
                  <div>
                    <img v-if="isdetailBollean" :src="item.arrimg[1]" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.arrimg[1]" alt="">
                  </div>
                  <div>
                    <img v-if="isdetailBollean" :src="item.arrimg[2]" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.arrimg[2]" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
                <div v-else class="treeimg flex-pack-justify flex">
                  <div>
                    <img v-if="isdetailBollean" :src="item.img" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.img" alt="">
                  </div>
                  <div>
                    <img v-if="isdetailBollean" :src="item.img2" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.img2" alt="">
                  </div>
                  <div>
                    <img v-if="isdetailBollean" :src="item.img3" alt="">
                    <img v-if="!isdetailBollean" v-lazy="item.img3" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

            <!-- 一张图 -->
            <div v-else-if="item.type == 0 || (item.type==1&&item.img&&!item.img.match(/default.png/)) || (item.type==2&&item.img) || (item.type==4&&item.img)" class="oneImage">
              <div @click="linkrouter(item)" class="aim flex flex-align-center flex-pack-justify">
                <div class="title flex flex-align-center flex-1">
                  {{item.title}}
                </div>
                <div class="imgpro">
                  <img v-if="isdetailBollean" :src="item.img" alt="">
                  <img v-if="!isdetailBollean" v-lazy="item.img" alt="">
                  <span v-if="item.type === '0'" class="write"></span>
                </div>

              </div>
<div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

            <!-- 音樂 -->
            <div class="audio" v-else-if="item.type == 3">
              <div @click="linkrouter(item)" class="h5audioimg flex flex-align-center">
                <img src="./h5_audio.png" alt="">
                <span class="title">{{item.title}}</span>
              </div>
              <div class="pro flex flex-align-center">
                  <span @click="linkuser(item.uid)" class="img flex flex-align-center"><img :src="item.authorLogo" alt="">{{item.from}}</span>
                  <span>{{item.time | splittimer}}</span>
                  <span>浏览量: {{item.visitNum}}</span>
                </div>
            </div>

          </li>
        </div>
</template>

<script>
import mixin from '@/common/js/list.js'

export default {
  name: 'list',
  mixins: [mixin],
  data () {
    return {
      isdetailBollean: false
    }
  },
  watch: {
    tuijianlist (dataval) {
      let op = dataval
      op.map((val, index) => {
        if (val.type === '0') {
          let lastindedxof = val.img.lastIndexOf('-')
          let yi = val.img.substring(0, lastindedxof)
          let lzui = val.img.substring(lastindedxof)
          let er = lzui.split('.')[1]
          let arrimg = []
          for (let i = 1; i < 4; i++) {
            arrimg.push(`${yi}-${i}.${er}`)
          }
          val.arrimg = arrimg
        }
      })
      return op
    }
  },
  methods: {

    // 点击作者头像触发
    linkuser (val) {
      this.$router.push({
        name: 'userlist',
        query: {
          uid: val
        }
      })
    },

    // 判断是否是相关推荐要用
    isdetail () {
      let detailarr = ['article', 'audio', 'video']
      if (detailarr.includes(this.$route.name)) {
        this.isdetailBollean = true
      } else {
        this.isdetailBollean = false
      }
    }

  },
  created () {
    this.isdetail()
  }

}
</script>

<style lang="less" scoped>
@import "~common/less/list.less";
</style>
