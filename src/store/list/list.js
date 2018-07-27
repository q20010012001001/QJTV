const state = {
  scrollTop: 0
}

const actions = {
  dema ({commit}, data) {
    commit('dema', {
      scroltop: data.scrollTop
    })
  }
}
const mutations = {
  dema (state, action) {
    state.scrollTop = action.scroltop
  }
}

export default {
  state,
  actions,
  mutations
}
