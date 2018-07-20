import Vuex from 'vuex'
import Vue from 'vue'
import plus from '@/store/plus/index'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    plus
  }
})
export default store
