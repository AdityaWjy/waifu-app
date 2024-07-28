import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './main.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Buat instance aplikasi Vue
const app = createApp(App);

// Gunakan plugin Toast
app.use(Toast);

// Mount aplikasi ke elemen dengan id 'app'
app.mount('#app');
