import Vuex from 'vuex'
import Vue from 'vue'
import plus from '@/store/plus/index'
import list from '@/store/list/list'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    plus,
    list
  }
})
export default store
