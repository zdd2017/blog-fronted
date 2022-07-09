import { createStore } from 'vuex'
import { LOGIN_ACTION, SET_USER_INFO } from '@/store/constants'

export default createStore({
  state: {},
  getters: {},
  mutations: {
    [SET_USER_INFO]() {}
  },
  actions: {
    // 登录
    // 用变量作为键名
    async [LOGIN_ACTION]({ commit }) {
      // const userInfo = res.data
      // commit(SET_USER_INFO, userInfo)
      // return userInfo
    }
  },
  modules: {}
})
