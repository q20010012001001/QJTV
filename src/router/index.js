import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/components/recommend/recommend'
import plus from '@/components/plus/plus'

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
      }
    },
    {
      path: '/plus',
      name: 'plus',
      component: plus
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
