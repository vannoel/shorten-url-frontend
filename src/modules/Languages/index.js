import LanguageCenter from './Language.js'
import langaugeStore from './store.js'

function languagePlugin (Vue) {
  Vue.prototype.$btbLang = Vue.$btbLang = new LanguageCenter()
}
function initLanguageVault (languageVault) {
  langaugeStore.init(languageVault)
}

export default {
  plugin: languagePlugin,
  init: initLanguageVault
}
