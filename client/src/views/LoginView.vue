<script setup lang="ts">
import MagicText from '../components/MagicText.vue';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="base">
    <div class="card">
      <div class="card-title" id="input-parent">Login</div>

      <form method="dialog">

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
                @blur="() => {addAnimation(playUsernameInputAnimation)}"
                @input="() => ($refs.usernameIcon as HTMLSpanElement).style.color = 'unset'"
              >
              <span class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error"></div>
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
                @blur="() => {addAnimation(playPasswordInputAnimation)}"
                @input="() => ($refs.passwordIcon as HTMLSpanElement).style.color = 'unset'"
              >
              <span class="card-input-data-input-border"></span>
            </div>
            <div class="card-input-data-error"></div>
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

        <div class="card-input login">
          <div class="card-input-icon-wrapper">
            <span ref="submitIcon" class="material-symbols-outlined card-input-icon login-icon">deployed_code</span>
          </div>
          <input type="submit" value="login" class="card-input-data-input login-button" @click="() => login()">
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
            passwordVisible: false,
            animationTasks: Array<CallableFunction>(),
        };
    },
    methods: {
      addAnimation(f: CallableFunction) {
        this.animationTasks.push(f);
        console.log(this.animationTasks)
        if (this.animationTasks.length === 1) this.animationTasks[0]();
      },
      runAnimation() {
        this.animationTasks.shift();
        if (this.animationTasks[0]) this.animationTasks[0]();
      },
      checkUsername() {
        return this.username !== '';
      },
      checkPassword() {
        return (this.password !== '' && this.password.length > 6);
      },
      playUsernameInputAnimation() {
        const duration = 700;
        if (this.username === "") {
          this.runAnimation()
          return (this.$refs.usernameIcon as HTMLSpanElement).style.color = "unset";
        }
        (this.$refs.usernameBorder as SVGElement).animate([
            { transform: "rotate(600deg)" }
        ], {
            duration: duration,
        }).play();
        const animation = (this.$refs.usernameBorderCircle as SVGElement).animate([
            { strokeDashoffset: "0", strokeWidth: 0 }
        ], {
            duration: duration,
        });
        animation.addEventListener("finish", () => {
          this.runAnimation();
        });
        animation.play();
        (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--secondary)";
      },
      playPasswordInputAnimation() {
        const duration = 700;
        if (this.password === "") {
          this.runAnimation()
          return (this.$refs.passwordIcon as HTMLSpanElement).style.color = "unset";
        }
        (this.$refs.passwordBorder as SVGElement).animate([
            { transform: "rotate(600deg)" }
        ], {
            duration: duration,
        }).play();
        const animation = (this.$refs.passwordBorderCircle as SVGElement).animate([
            { strokeDashoffset: "-5%", strokeWidth: 0 }
        ], {
            duration: duration,
        });
        animation.addEventListener("finish", () => this.runAnimation());
        animation.play();
        (this.$refs.passwordIcon as HTMLSpanElement).style.color = "var(--secondary)";
      },
      credsDown() {
        this.playLoginAnimation(false);
      },
      credsUp() {
        this.playLoginAnimation(true);
      },
      playLoginAnimation(reverse: boolean) {
        const timingOptions: KeyframeAnimationOptions = {
          duration: 500,
          easing: "cubic-bezier(1,0,1,1)",
          fill: "forwards",
          direction: reverse ? "reverse" : "normal"
        };
        (this.$refs.usernameIcon as HTMLSpanElement).animate([
          {marginTop: "0", opacity: 1},
          {marginTop: "15vw", opacity: 0}
        ], timingOptions).play();
        const animation = (this.$refs.passwordIcon as HTMLSpanElement).animate([
          {marginTop: "0", opacity: 1},
          {marginTop: "10vw", opacity: 0}
        ], timingOptions);

        animation.addEventListener("finish", () => this.runAnimation());
        animation.play();
      },
      login() {
        if (document.hasFocus() && document.activeElement) {
          let el = document.activeElement as HTMLInputElement
          el.blur();
        }
        setTimeout(() => {
          let u = this.checkUsername();
          let p = this.checkPassword();
          this.addAnimation(this.credsDown);
          if (!u || !p) {
            setTimeout(() => {
              if (!u) (this.$refs.usernameIcon as HTMLSpanElement).style.color = "var(--error)";
              if (!p) (this.$refs.passwordIcon as HTMLSpanElement).style.color = "var(--error)";
              this.addAnimation(this.credsUp);
            }, 800);
          }
        }, 0);
      },
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
    'opsz' 48;
  }
  .base {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12vw;
  }

  .card {
    width: 50%;
    height: 30vw;
    padding: 1.7% 4%;
    background: var(--color-background-mute);
    opacity: .8;
    margin-bottom: 10%;
  }

  .card-title {
    font-size: 250%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }

  .card-input {
    display: flex;
    justify-content: center;
    flex-direction: row;

    width: 50%;
    height: 4vw;

    margin-bottom: 1vw;
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
    width: 200%;
    height: 25px;
  }

  .card-input-icon {
    font-size: 30px;

    padding: 4px;

    transition: color 1s, margin .5s;
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

  .login {
    height: unset;
    margin-top: 9%;
  }

  .login-button {
    cursor: pointer;
    border: .15vw solid var(--color-text);
    border-radius: .5vw;
    padding-bottom: unset;
    padding: 2.5%;
    margin-top: -1.25%;
  }

  .login-icon {
    transition: color .3s;
    transition-delay: .5s;
  }

</style>