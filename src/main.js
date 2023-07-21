import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import axios from "./service/axios";
//import formValidation from "./service/formValidation";
import vClickOutside from 'click-outside-vue3';
import Vue3MobileDetection from "vue3-mobile-detection";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({ icons: { defaultSet: 'mdi'}});

const vuetify = createVuetify({components,directives,});
const app = createApp(App);
//const axiosInstance = axios.create({withCredentials: true});

app.use(store);
app.use(router);
//app.use(formValidation);
app.use(vuetify);
app.use(vClickOutside);
app.use(Vue3MobileDetection);
app.config.globalProperties.axios = axios;
//app.config.globalProperties.$axios = { ...axiosInstance }
app.mount("#app");