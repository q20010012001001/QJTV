import * as types from './mutations-type.js'
const mutations = {
  [types.NAVDATA] (state, data) {
    state.navdata = data
  }
}

export default mutations
