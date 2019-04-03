// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import Axios from 'axios'
import qs from 'qs';
import BootstrapVue from 'bootstrap-vue'
import {Pagination,MessageBox,Message,Breadcrumb,BreadcrumbItem,Checkbox,CheckboxButton,CheckboxGroup,DatePicker} from 'element-ui';
import router from './router'
import $ from 'jquery'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios=Axios;
Vue.prototype.$qs = qs;

//全局的 axios 默认值
Axios.defaults.baseURL = 'http://www.50d.shop'						//"https://exam.edmarketing.cn/diamond";//"http://192.168.22.126:8080";	//"http://192.168.22.240/diamond"; 
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(BootstrapVue);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(DatePicker);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
