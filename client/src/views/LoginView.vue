<template>
  <div class="base">
    <div class="card">
      <div class="card-title">Register</div>
      <CredentialsInput class="input" title="Username" placeholder="" :active="false" />
    </div>
  </div>
</template>

<script lang="ts">
  import CredentialsInput from '@/components/CredentialsInput.vue';
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data() {
      return {
        identifier: "",
        password: "",
        response: "test",
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
          if (res.data.errorCode % 2 == 0)
            this.response += "\nUsername or email not found";
          if (res.data.errorCode % 3 == 0)
            this.response += "\nWrong password";
        })
          .catch(err => {
          console.error(err);
          this.response = "something went wrong";
        });
      },
      logout() {
        AuthenticationService.logout()
          .then(res => {
          this.response = res.data;
        });
      }
    },
    components: { CredentialsInput }
}
</script>

<style scoped>
  .base {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .card {
    width: 60%;
    min-height: 400px;
    padding: 20px 5%;
    background: var(--color-background-mute);
    opacity: .8;
  }

  .card-title {
    font-size: 400%;
    margin-bottom: 5%;
  }

  .input {
    position: absolute;
  }
</style>