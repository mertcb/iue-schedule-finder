import Vue from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	vuetify,
	template: '<App/>'
});
