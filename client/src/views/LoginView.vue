<template>
  <div class="base">
    <div class="card">
      <div class="card-title">Register</div>
      <CredentialsInput class="input" id="username" title="Username" placeholder="" :active="false" :top="130" :left="70"/>
      <CredentialsInput class="input" id="password" title="Password" placeholder="" :active="false" :top="200" :left="70"/>
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
    mounted() {
      const createInput = (id: string, location: Array<number>) => {
        const wrapper = <HTMLDivElement>(document.querySelector('#' + id))
        let pickedUp: boolean = false;
        let x: number, y: number;
        wrapper.addEventListener('mousedown', (event) => {
          pickedUp = true;
          x = event.clientX - location[0];
          y = event.clientY - location[1];
        });
        wrapper.addEventListener('mouseup', () => {
          pickedUp = false;
        });
        wrapper.addEventListener('mousemove', (event) => {
          if (!pickedUp) return;
          location[0] = event.clientX - x;
          location[1] = event.clientY - y;
          wrapper.style.left = location[0] + 'px';
          wrapper.style.top = location[1] + 'px';
        })
      }

      createInput('username', [70, 130]);
      createInput('password', [70, 250]);
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
    padding: 20px 70px;
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