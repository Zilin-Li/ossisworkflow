import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//main.js

Vue.config.productionTip = false

new Vue({
  data:function(){
    return{
      jobNum:'',
      client: '',
      patient: '',
      statusSelected: '',
      DHFstatusSelected: '',
      dhfStatusUUID:'',
      dateOfBirth: '',
      device: '',
      anatomy: '',
      pathology: '',
      sApproach: '',
      hospital: '',
      sDate: '',
      severDomain:'http://localhost'
    }


  },

  router,
  render: h => h(App)
}).$mount('#app')
