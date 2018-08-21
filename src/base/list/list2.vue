<template>
    <div class="list">
        <li
         :class="{
           active:sessionlist.includes(item.id),
           hoverbg:item.color
           }"
          v-for="(item,index) in tuijianlist"
           :key="index"
            @touchstart="touchstartcloclr(index)"
             @touchend="touchendcloclr(index)">
                      <!-- 没图 -->
          <div v-if="(item.type == 1&& !item.imgs[0].img)" class="noImage">
            <div @click="linkrouter(item)" class="title flex flex-align-center">
                  {{item.title}}
                </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
          </div>

          <!-- 三张图 -->
            <div class="treeImage" v-else-if="(item.type==0&&item.imgs[1]&&item.imgs[2]) || (item.type==1&&item.imgs[1]&&item.imgs[2]) || (item.type==2&&item.imgs[1]&&item.imgs[2])">
              <div @click="linkrouter(item)">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div v-if="item.type == 0" class="treeimg flex-pack-justify flex">
                  <div><img v-lazy="item.imgs[0].img" alt=""></div>
                  <div><img v-lazy="item.imgs[1].img" alt=""></div>
                  <div>
                    <img v-lazy="item.imgs[2].img" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
                <div v-else class="treeimg flex-pack-justify flex">
                  <div><img v-lazy="item.imgs[0].img" alt=""></div>
                  <div><img v-lazy="item.imgs[1].img" alt=""></div>
                  <div>
                    <img v-lazy="item.imgs[2].img" alt="">
                    <span v-if="item.type === '0'" class="write"></span>
                  </div>
                </div>
              </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>
<!-- 一张图 -->
            <div v-else-if="item.type == 0 || (item.type==1&&item.imgs[0]) || (item.type==2&&item.imgs[0]) || (item.type==4&&item.imgs[0])" class="oneImage">
              <div @click="linkrouter(item)" class="aim flex flex-align-center flex-pack-justify">
                <div class="title flex flex-align-center">
                  {{item.title}}
                </div>
                <div class="imgpro">
                  <img v-lazy="item.imgs[0].img" alt="">
                  <span v-if="item.type == '0'" class="write"></span>
                </div>

              </div>
<div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>

            <!-- 音樂 -->
            <div class="audio" v-else-if="item.type == 3">
              <div @click="linkrouter(item)" class="h5audioimg flex flex-align-center">
                <img src="./h5_audio.png" alt="">
                <span class="title">{{item.title}}</span>
              </div>
              <div class="pro flex flex-align-center">
                  <span>{{item.date | splittimer}}</span>
                  <span>浏览量: {{item.view}}</span>
                  <span @click="Collection" class="Collection flex flex-align-center">
                    <img src="./shoucang.png" alt="">
                    收藏
                  </span>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
import mixin from '@/common/js/list.js'
export default {
  name: 'list2',
  mixins: [mixin],
  methods: {
    Collection (val) {
      // alert(1)
    }

  }
}
</script>

<style lang="less" scoped>
@import "~common/less/list.less";
.Collection{
  img{
    width:20/@rem;
    margin-right:6/@rem;
  }
}
</style>
