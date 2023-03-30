<template>
  <form method="post">
    <input type="text" name="username" v-model="username">
    <input type="text" name="email" v-model="email">
    <input type="text" name="password" v-model="password">
    <input type="text" name="passwordRepeat" v-model="passwordRepeat">
    <button @click.prevent="$event => register()">Submit</button>
    <div>{{ response }}</div>
  </form>
</template>

<script lang="ts">
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        response: 'test',
      };
    },
    methods: {
      register() {
        AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordRepeat: this.passwordRepeat
        })
          .then(res => {
            this.response = res.status.toString();
            this.response += "  " + res.data.errorCode;
            if (res.data.errorCode % 2 == 0) this.response += '\nEmpty username'
            if (res.data.errorCode % 3 == 0) this.response += '\nEmpty email'
            if (res.data.errorCode % 5 == 0) this.response += '\nEmpty password'
            if (res.data.errorCode % 7 == 0) this.response += '\nPasswords dont match'
            if (res.data.errorCode % 11 == 0) this.response += '\nEmail not valid'
            if (res.data.errorCode % 13 == 0) this.response += '\nUsername exists'
            if (res.data.errorCode % 17 == 0) this.response += '\nEmail exists'
          })
          .catch(err => {
            console.error(err);
            this.response = "something went wrong"
          });
      }
    }
  }
</script>