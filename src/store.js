import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 10,
    time: new Date().getTime()
  },
  mutations: {
    ['addNum'](state, payload) {
      state.num += payload.number
    },
    ['getTime'](state, payload) {
      state.time = new Date().toLocaleTimeString()
    }
  },
  actions: {}
})
