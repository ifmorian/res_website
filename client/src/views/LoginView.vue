<script setup lang="ts">
  import MagicText from '../components/MagicText.vue';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="base">
    <div class="card">
      <MagicText class="card-title" id="input-parent" size="300%" text="Login"/>

      <form action="post">

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="usernameIcon" class="material-symbols-outlined card-input-icon">person</span>
            <svg ref="usernameBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="usernameBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="username"
                class="card-input-data-input"
                @blur="() => playInputAnimation(0)"
                @input="() => ($refs.usernameIcon as HTMLSpanElement).style.color = 'unset'"
              >
              <span class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">Testjsaefbkaebfjkefkl awdawd awdawdadawd</div>
          </div>
        </div>

        <div class="card-input">
          <div class="card-input-icon-wrapper">
            <span ref="passwordIcon" class="material-symbols-outlined card-input-icon">key</span>
            <svg ref="passwordBorder" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card-input-icon-border">
              <circle ref="passwordBorderCircle" cx="1" cy="1" r=".85" />
            </svg>
          </div>
          <div class="card-input-data">
            <div class="card-input-data-input-wrapper">
              <input 
                placeholder="password"
                v-model="password"
                name="password"
                :type="passwordVisible ? 'text' : 'password'"
                class="card-input-data-input"
                @blur="() => playInputAnimation(1)"
                @input="() => ($refs.passwordIcon as HTMLSpanElement).style.color = 'unset'"
              >
              <span class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error">Testjsaefbkaebfjkefkl awdawd awdawdadawd</div>
          </div>
          <span
            class="material-symbols-outlined card-input-icon-password"
            @mousedown="(event) => {passwordVisible = true; event.preventDefault();}"
            @mouseup="(event) => passwordVisible = false"
            @mouseleave="(event) => passwordVisible = false"
          >
            {{passwordVisible ? 'visibility_off' : 'visibility'}}
          </span>
        </div>

      </form>

    </div>
  </div>
</template>

<script lang="ts">

  export default {
    data() {
        return {
            username: "",
            password: "",
            passwordVisible: false
        };
    },
    methods: {
        playInputAnimation(el: number) {
            const duration = 700;
            switch (el) {
                case 0: {
                    if (this.username === "")
                        return (this.$refs.usernameIcon as HTMLSpanElement).style.color = "unset";
                    (this.$refs.usernameBorder as SVGElement).animate([
                        { transform: "rotate(600deg)" }
                    ], {
                        duration: duration,
                    }).play();
                    (this.$refs.usernameBorderCircle as SVGElement).animate([
                        { strokeDashoffset: "0", strokeWidth: 0 }
                    ], {
                        duration: duration,
                    }).play();
                    (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--success)";
                    break;
                }
                case 1: {
                    if (this.password === "")
                        return (this.$refs.passwordIcon as HTMLSpanElement).style.color = "unset";
                    (this.$refs.passwordBorder as SVGElement).animate([
                        { transform: "rotate(600deg)" }
                    ], {
                        duration: duration,
                    }).play();
                    (this.$refs.passwordBorderCircle as SVGElement).animate([
                        { strokeDashoffset: "-5%", strokeWidth: 0 }
                    ], {
                        duration: duration,
                    }).play();
                    (this.$refs.passwordIcon as HTMLSpanElement).style.color = "var(--success)";
                    break;
                }
            }
        }
    },
    components: { MagicText }
}
</script>

<style scoped>
  .material-symbols-outlined {
    user-select: none;
    font-variation-settings:
    'FILL' 0,
    'wght' 300,
    'GRAD' 0,
    'opsz' 48
  }
  .base {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25vh;
  }

  .card {
    width: 50%;
    padding: 1.7% 4%;
    background: var(--color-background-mute);
    opacity: .8;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  .card-input {
    display: flex;
    flex-direction: row;

    width: 50%;

    margin-bottom: 10%;
  }

  .card-input-data {
    display: flex;
    flex-direction: column;

    width: 100%;
  }

  .card-input-data-input-wrapper {
    position: relative;

    width: 100%;
    height: 36px;
    margin-bottom: 1%;
    
    border-bottom: 2px solid var(--color-background);
  }

  .card-input-data-input {
    color: var(--color-text);
    font-size: 24px;
    background: transparent;

    width: 100%;
    height: calc(100% + 2px);

    padding-bottom: 8px;

    border: none;
    outline: none;
  }

  .card-input-data-input-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: calc(100% + 2px);
    border-bottom: 2px solid var(--secondary);
    transition: width .3s;
  }

  .card-input-data-input:focus ~ .card-input-data-input-border {
    width: 100%;
  }

  .card-input-data-error {
    color: var(--error);
    font-size: 16px;
  }

  .card-input-icon {
    font-size: 30px;

    padding: 4px;

    transition: color 1s;
  }

  .card-input-icon-wrapper {
    position: relative;
    margin-right: 14px;
    height: 100%;
  }

  .card-input-icon-border {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    transform: rotate(0deg);
  }

  .card-input-icon-border circle {
    stroke-width: .1;
    stroke: var(--secondary);
    fill: none;
    stroke-dasharray: 270%;
    stroke-dashoffset: 270%;
  }

  .card-input-icon-password {
    position: absolute;
    right: 5px;
    font-size: 30px;
    cursor: pointer;
  }

</style>