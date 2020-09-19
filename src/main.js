import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// var NetsocIam = require('@netsoc/iam');


// var defaultClient = NetsocIam.ApiClient.instance;
// // Configure Bearer (jwt) access token for authorization: jwt_admin
// var jwt_admin = defaultClient.authentications['jwt_admin'];
// jwt_admin.accessToken = "YOUR ACCESS TOKEN"

// var api = new NetsocIam.UsersApi()
// var opts = {
//   'user': {"username":"bro","email":"bro@tcd.ie","password":"hunter22","first_name":"Bro","last_name":"Dude"} // {User} User to create
// };
// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.createUser(opts, callback);
