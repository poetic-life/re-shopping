import { setUserInfo, getUerInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUerInfo()
    }
  },

  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setUserInfo(obj)
    }
  },
  actions: {},
  getters: {}

}
