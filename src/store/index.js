import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state () {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token // 从 user 模块的 state 中获取 token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
