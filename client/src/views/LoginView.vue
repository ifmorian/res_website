<template>
  <form method="post">
    <input type="text" name="username" v-model="identifier">
    <input type="text" name="password" v-model="password">
    <button @click.prevent="$event => register()">Submit</button>
    <div>{{ response }}</div>
  </form>
  <button @click.prevent="$event => logout()">Submit</button>
</template>

<script lang="ts">
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data() {
      return {
        identifier: '',
        password: '',
        response: 'test',
      };
    },
    methods: {
      register() {
        AuthenticationService.login({
          identifier: this.identifier,
          password: this.password,
        })
          .then(res => {
            this.response = res.status.toString();
            this.response += "  " + res.data.errorCode;
            if (res.data.errorCode % 2 == 0) this.response += '\nUsername or email not found'
            if (res.data.errorCode % 3 == 0) this.response += '\nWrong password'
          })
          .catch(err => {
            console.error(err);
            this.response = "something went wrong"
          });
      },

      logout() {
        AuthenticationService.logout()
          .then(res => {
            this.response = res.data;
          })
      }
    }
  }
</script>