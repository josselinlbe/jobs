import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    loaderActive: false,
    snackbar: {
      visible: false,
      text: null,
      timeout: 4000,
      multiline: false,
      color: ''
    },
    appBarTabs: [],
    leftDrawer: false,
    rightDrawer: false,
    sessionLogs: [],
  },
  actions,
  mutations,
  getters
})
