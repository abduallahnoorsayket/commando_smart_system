import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scripts/main";
import store from "./store/store";
import axios from "../src/components/layouts/authheader";
import LangJson from "../src/components/MultilangModule/lang.json";

// import "./assets"
// import VCalendar from 'v-calendar';

const Swal = require("sweetalert2");

// createApp(App).use(router, Swal).use(store).mount('#app')
createApp(App).use(router, Swal, axios).use(store, LangJson).mount("#app");
