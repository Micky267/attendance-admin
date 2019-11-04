import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curNav:''
  },
  mutations: {
    setCurNav(state,curNav){
      state.curNav = curNav
    }
  
  },
  actions: {
  },
  modules: {
  }
})
