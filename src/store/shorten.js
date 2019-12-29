const LIMITATION_URL_CATCH = 20;

// initial state
const state = {
  urls: []
}
// { longURL: '', shortenAt: '', shortenURL: ''}

// actions
const actions = {
  catch ({ commit }, urlInfo) {
    commit('CATCH_URL', urlInfo)
  },
  remove ({ commit }, urlInfo) {
    commit('REMOVE_URL', urlInfo)
  }
}

// mutations
const mutations = {
  CATCH_URL: function (state, urlInfo) {
    let tmpURLs = [].concat(urlInfo, state.urls);
    state.urls = tmpURLs.slice(0, LIMITATION_URL_CATCH);
  },
  REMOVE_URL: function (state, urlTimestamp) {
    state.urls = state.urls.filter((url)=>{
      return (url.shortenAt !== urlTimestamp)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
