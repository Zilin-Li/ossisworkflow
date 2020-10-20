import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


//main.js

Vue.config.productionTip = false

new Vue({
  data:function(){
    return{
      jobNum:'',
      client: '',
      patient: '',
      statuSelected: '',
      DHFstatuSelected: '',
      dhfStatusUUID:'',
      dateOfBirth: '',
      device: '',
      anatomy: '',
      pathology: '',
      sApproach: '',
      hospital: '',
      sDate: ''
    }


  },

  router,
  render: h => h(App)
}).$mount('#app')
