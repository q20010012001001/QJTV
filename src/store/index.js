import Vuex from 'vuex'
import Vue from 'vue'

import state from '@/store/state.js'
import mutations from '@/store/mutations.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer (val) {
      return {
        navdata: val.navdata
      }
    }
  })]
})
export default store
