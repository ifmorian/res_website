import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/main.css';
import AuthenticationService from './services/AuthenticationService';

const app = createApp(App);

app.mixin({
  methods: {
    $updateSession: async () => {
      AuthenticationService.isloggedin().then(res => {
        store.userId.value = res.data.userId;
      })
    }
  }
})

app.use(router);

app.mount('#app');
