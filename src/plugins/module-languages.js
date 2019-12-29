import Vue from 'vue'

import ModuleLanguage from '@/modules/Languages/index.js'
import enUS from '@/assets/lang/en_US.js'
import zhTW from '@/assets/lang/zh_TW.js'

ModuleLanguage.init([
  { index: 'en_US', label: 'English', dictionary: enUS },
  { index: 'zh_TW', label: '中文', dictionary: zhTW }
])


Vue.use(ModuleLanguage.plugin);