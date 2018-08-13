import * as types from './mutations-type.js'
const mutations = {
  [types.NAVDATA] (state, data) {
    state.navdata = data
  },
  [types.TITLECOLOR] (state, data) {
    let ruteon = {
      id: []
    }
    if (sessionStorage.getItem('newsid')) {
      ruteon = JSON.parse(sessionStorage.getItem('newsid'))
    }
    if (!ruteon.id.includes(data)) { // 去重
      ruteon.id.push(data)
    }
    sessionStorage.setItem('newsid', JSON.stringify(ruteon))
    state.titlecolor = ruteon.id
  }
}

export default mutations
