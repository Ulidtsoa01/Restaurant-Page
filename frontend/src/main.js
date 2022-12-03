import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import '@mdi/font/css/materialdesignicons.css'
 import LoadScript from "vue-plugin-load-script";
import * as VueGoogleMaps from "vue2-google-maps"

Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAjzXR5BDwUSSdHAQQgurxNub6qeqzXmdE",
    libraries: "places"
  }
});


new Vue({
  router,
  vuetify,
  LoadScript,
  render: h => h(App)
}).$mount('#app')
