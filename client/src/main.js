import Vue from 'vue'
import app from './app'

import swinit from './service-workers/sw-init'
import sw from './service-workers/sw'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { app }
})
