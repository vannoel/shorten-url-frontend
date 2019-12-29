import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-brands-svg-icons'
// import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faGlobe, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSpinner,
  faGlobe,
  faTrashAlt,
)

Vue.component('FAI', FontAwesomeIcon)