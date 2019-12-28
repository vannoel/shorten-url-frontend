import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import shorten from '@/store/shorten'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: debug,
  modules: {
    shorten
  },
  plugins: [
    createPersistedState({
      key: 'btblab-shorten-url',
      reducer (state) {
        return {
          language: state.language,
          shorten: state.shorten
        }
      }
    })
  ],
  state: {
    isLoading: 0,
    language: ''
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.isLoading = status;
    },
    SET_LANGUAGE(state, language) {
      state.language = language;
    }
  }
})
