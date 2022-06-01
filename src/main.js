import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue3Lottie from "vue3-lottie";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Vue3Lottie)
  .use(Antd)
  .use(BootstrapVue3)
  .mount("#app");
