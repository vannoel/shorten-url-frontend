import Vue from 'vue'

import ModuleButton from '@/modules/Button/Button.vue'
// import FormGroup from '@/components/modules/Form_Group'
import ModuleInput from '@/modules/Input/Input.vue'
import ModuleTimeline from '@/modules/Timeline/Timeline.vue'

// import Language from '@/components/languages/Language.js'
// import ImageOverlay from '@/components/imageOverlay/index.js'

Vue.component('ModuleButton', ModuleButton)
// Vue.component('oc-form-group', FormGroup)
Vue.component('ModuleInput', ModuleInput)
Vue.component('ModuleTimeline', ModuleTimeline)

// Vue.use(Language);
// Vue.use(ImageOverlay.plugin);