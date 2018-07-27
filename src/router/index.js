import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import plus from '@/base/plus/plus'
import article from '@/components/article/article'
import video from '@/components/video/video'
import album from '@/components/album/album'
import audio from '@/components/audio/audio'
import userlist from '@/components/userlist/userlist'
import search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend', // 首页
      name: 'recommend',
      component: recommend,
      beforeEnter (to, from, next) {
        // 如果没有id跳往推荐页面
        if (!to.query.id) {
          next('/recommend?id=0')
        } else {
          next()
        }
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/plus',
      name: 'plus',
      component: plus
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/album',
      name: 'album',
      component: album
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/audio',
      name: 'audio',
      component: audio
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: userlist
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/',
      redirect: '/recommend' // 重定向到首页
    },
    {
      path: '*',
      redirect: '/recommend'
    }
  ]
})
