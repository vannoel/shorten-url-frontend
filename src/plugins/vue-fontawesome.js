import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-brands-svg-icons'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faPlus, faSignOutAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// add used icon, refer to https://fontawesome.com/
// 'user secret' - > 'faUserSecret'
library.add(
  faSpinner,
  faPlus,
  faSignOutAlt,
  faFilePdf,
  faExternalLinkAlt
)

Vue.component('fa-icon', FontAwesomeIcon)